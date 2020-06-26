//
//  ViewController.swift
//  SampleProject
//
//  Created by admin on 12/27/19.
//  Copyright © 2019 y4gamilight. All rights reserved.
//

import UIKit
import CoreUI
import AuthenticationServices
import FirebaseAuth

class ViewController: Y4gViewController {
    
    @IBOutlet weak var viewContain: UIView!
    private var currentNonce:String?
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        setupProviderLoginView()
    }
    
    func setupProviderLoginView() {
        let authorizationButton = ASAuthorizationAppleIDButton()
        authorizationButton.addTarget(self, action: #selector(handleAuthorizationAppleIDButtonPress), for: .touchUpInside)
        self.viewContain.addSubview(authorizationButton)
        authorizationButton.frame = self.viewContain.bounds
    }
    
    @objc @IBAction func handleAuthorizationAppleIDButtonPress() {
        let appleIDProvider = ASAuthorizationAppleIDProvider()
        let request = appleIDProvider.createRequest()
        let nonce = Utils.shaRandomNonceString()
        request.requestedScopes = [.fullName, .email]
        request.nonce = nonce
        currentNonce = nonce
        
        let authorizationController = ASAuthorizationController(authorizationRequests: [request])
        authorizationController.delegate = self
        //        authorizationController.presentationContextProvider = self
        authorizationController.performRequests()
    }
    
    func goToMainScreen(displayName:String?) {
        guard let vc = self.storyboard?.instantiateViewController(identifier: "MainViewController") as? MainViewController else {
            return
        }
        vc.title = displayName ?? "Unknown"
        self.navigationController?.pushViewController(vc, animated: true)
    }
}

extension ViewController: ASAuthorizationControllerPresentationContextProviding {
    
    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        return self.view.window!
    }
}
extension ViewController: ASAuthorizationControllerDelegate {
    func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
      
        guard let currentNonce = currentNonce else {return}
        guard let appleIDCredential = authorization.credential as? ASAuthorizationAppleIDCredential else {return}
        // Create an account in your system.
        guard let idTokenData = appleIDCredential.identityToken else {return }
        guard let idTokenString = String(data: idTokenData, encoding: .utf8) else { return}
          print("Authorization completed \(currentNonce)")
        let credential = OAuthProvider.credential(withProviderID: "apple.com",
                                                  idToken: idTokenString,
                                                  rawNonce: currentNonce)
        // Sign in with Firebase.
        Auth.auth().signIn(with: credential) { (authResult:AuthDataResult?, error:Error?) in
            guard let authResult = authResult else {
                if let error = error {
                    print(error.localizedDescription)
                }
                return
            }
            // User is signed in to Firebase with Apple.
            DispatchQueue.main.async {
                self.goToMainScreen(displayName: authResult.user.email)
            }
        }
    }
    func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
        print("Authorization error \(error.localizedDescription)")
    }
    
    
    
}

