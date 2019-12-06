//
//  AppDelegate.swift
//  scrum-ios
//
//  Created by Matias Glessi on 2/7/17.
//  Copyright © 2017 Matias Glessi. All rights reserved.
//

import UIKit
import Firebase
import FirebaseAuth
import GoogleSignIn
import IQKeyboardManagerSwift
import Amplitude_iOS

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, GIDSignInDelegate {
    
    var coordinator: AppCoordinator?

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        FirebaseApp.configure()
        GIDSignIn.sharedInstance().clientID = FirebaseApp.app()?.options.clientID
        GIDSignIn.sharedInstance().delegate = self
        IQKeyboardManager.shared.enable = true
        
        IQKeyboardManager.shared.toolbarManageBehaviour = .byPosition
        IQKeyboardManager.shared.toolbarDoneBarButtonItemText = "OK"
        IQKeyboardManager.shared.shouldShowToolbarPlaceholder = false

        Amplitude.instance()?.initializeApiKey("9c652ae3f838af1c39be7d14876fc388")
        initializeCoordinator()
        
        return true
    }
    
    
    func sign(_ signIn: GIDSignIn!, didDisconnectWith user: GIDGoogleUser!, withError error: Error!) {
        // Perform any operations when the user disconnects from app here.
        // ...
    }

    // MARK: - GIDSignInDelegate
    
    @available(iOS 9.0, *)
    func application(_ application: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any])
        -> Bool {
            
            let sourceApplication = options[UIApplicationOpenURLOptionsKey.sourceApplication] as? String
            
            let googleHandle = GIDSignIn.sharedInstance().handle(url,
                                                         sourceApplication: sourceApplication,
                                                         annotation: [:])
            
            return googleHandle
    }
    
    
    func sign(_ signIn: GIDSignIn!, didSignInFor user: GIDGoogleUser!, withError error: Error?) {
        // ...
        if let error = error {
            print(error.localizedDescription)
            return
        }
        
        guard let authentication = user.authentication else { return }
        
        let credential = GoogleAuthProvider.credential(withIDToken: authentication.idToken,
                                                       accessToken: authentication.accessToken)
        Auth.auth().signInAndRetrieveData(with: credential) { (result, error) in
            if let result = result {
                
                
                print(result.user.email)
                print(result.user.displayName)
                UserDefaults.standard.set(true, forKey: "userLoggedIn")

                NotificationCenter.default.post(name: Notification.Name.UserLoggedIn, object: self, userInfo: [:])
            }
            else {
                print(error?.localizedDescription)
            }
        }
    }
    
    private func initializeCoordinator(){
        let navController = UINavigationController()
        navController.isNavigationBarHidden = true
        coordinator = AppCoordinator(navigationController: navController)
        coordinator?.start()
        
        window = UIWindow.init(frame: UIScreen.main.bounds)
        window?.rootViewController = navController
        window?.makeKeyAndVisible()
    }

}



