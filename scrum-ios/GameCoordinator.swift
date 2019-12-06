//
//  GameCoordinator.swift
//  scrum-ios
//
//  Created by Matias on 06/04/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import UIKit

class GameCoordinator: Coordinator {
    
    weak var parentCoordinator: SublevelCoordinator?
    
    var childCoordinators = [Coordinator]()
    var gamesLeftToPlay = [Game]()
    var levelValue: Int?
    var sublevelValue: Int?
    var fromGame: Int = 0
    var navigationController: UINavigationController
    
    init(navigationController: UINavigationController) {
        self.navigationController = navigationController
    }
    
    func start() {
        
        let vc = GameViewController.instantiate(for: ConstantsHelper.Storyboard.tutorial)
        vc.games = gamesLeftToPlay
        vc.currentGameIndex = fromGame // currentGameIndex
        vc.coordinator = self
        navigationController.pushViewController(vc, animated: true)
    }
    
    
    
    func didFinishAllGames(forSublevel: Int){
        parentCoordinator?.didFinishSublevel(value: forSublevel)

    }
    
    func didExitCurrentGame(){
        parentCoordinator?.didExitGame(self)
    }
    
}
