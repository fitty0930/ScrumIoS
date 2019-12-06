//
//  CredentialsCoordinator.swift
//  scrum-ios
//
//  Created by Matias on 10/03/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import UIKit

class CredentialsCoordinator: Coordinator {
    
    weak var parentCoordinator: AppCoordinator?
    var childCoordinators =  [Coordinator]()
    var navigationController: UINavigationController
    
    init(navigationController: UINavigationController) {
        self.navigationController = navigationController
    }
    
    func start() {
        let vc = InitialViewController.instantiate(for: ConstantsHelper.Storyboard.main)
        vc.coordinator = self
        navigationController.pushViewController(vc, animated: true)
    }
    
    func test(){
        let vc = DraggableTextGameViewController.instantiate(for: ConstantsHelper.Storyboard.tutorial)
        navigationController.pushViewController(vc, animated: true)
    }

    func didFinishAuthentication(){
        self.parentCoordinator?.didFinishAuthenticating()
    }
    
    func register() {
        let vc = RegisterCredentialsViewController.instantiate(for: ConstantsHelper.Storyboard.main)
        vc.coordinator = self
        navigationController.pushViewController(vc, animated: true)
    }
    
    func addPersonalInformation(with credentials: TemporalCredentials) {
        let vc = RegisterPersonalInfoViewController.instantiate(for: ConstantsHelper.Storyboard.main)
        vc.coordinator = self
        vc.credentials = credentials
        navigationController.pushViewController(vc, animated: true)
    }
}
