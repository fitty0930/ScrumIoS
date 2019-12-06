//
//  SublevelCoordinator.swift
//  scrum-ios
//
//  Created by Matias on 10/03/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import UIKit

class SublevelCoordinator: Coordinator {
    
    weak var parentCoordinator: LevelsCoordinator?
    weak var sublevel: SubLevel?
    weak var level: Level?
    weak var progress: Progress?
    
    var childCoordinators = [Coordinator]()
    var navigationController: UINavigationController
    
    init(navigationController: UINavigationController) {
        self.navigationController = navigationController
    }
    
    
    fileprivate func showTutorial() {
        if let steps = self.sublevel?.theoricalSteps {
            self.showTutorial(steps: steps)
        }
    }
    
    func start() {
        
        guard let level = level else {
            back()
            return
        }
 
        RealmService.getProgress(for: level) { (progress, error) in
            if let prog = progress {
                self.progress = prog
                
                if prog.sublevel_id < (self.sublevel?.id)! {
                    self.showTutorial()
                }
                else {
                    if prog.tutorial_completed {
                        self.showGame()
                    }
                    else {
                        self.showTutorial()
                    }
                }
            }
        }
    }
    
    func showTutorial(steps: [Step]){
        
        
        let child = TheoryCoordinator.init(navigationController: navigationController)
        child.parentCoordinator = self
        child.steps = steps
        child.sublevel = sublevel
        child.level = level
        childCoordinators.append(child)
        child.start()
    }
    
    func showGame() {
        
        
        if let sublevel = sublevel,
            let level = level {
            let child = GameCoordinator.init(navigationController: navigationController)
            child.parentCoordinator = self
            child.levelValue = level.id
            child.sublevelValue = sublevel.id
            child.gamesLeftToPlay = sublevel.games ?? []
            child.fromGame = currentGame()
            childCoordinators.append(child)
            child.start()
        }
    }
    
    
    
    
    func didFinishTutorial(_ coordinator: TheoryCoordinator) {
        childDidFinish(coordinator)
        showGame()
    }
    
    
    func didExitGame(_ coordinator: GameCoordinator) {
        childDidFinish(coordinator)
        backToSublevel()
    }
    
    func didExitTutorial(_ coordinator: TheoryCoordinator) {
        childDidFinish(coordinator)
        backToSublevel()
    }
    
    func didFinishSublevel(value: Int){
        
        if value == level?.sublevels.count {
            if let level = level, let id = level.id {
                NotificationCenter.default.post(name: .didFinishAllSublevels, object: nil)
                RealmService.saveUserOverallData(with: ["currentAvailableLevel": id+1])
            }
        }
        
        
        
        backToSublevel()
    }
    
    func backToSublevel(){
        
        for controller in navigationController.viewControllers as Array {
            if controller.isKind(of: SubLevelViewController.self) {
                _ =  navigationController.popToViewController(controller, animated: true)
                break
            }
        }
    }

    
    private func currentGame() -> Int {
        let currentSublevelID = sublevel?.id
        let progressSublevelID = progress?.sublevel_id
        
        if currentSublevelID == progressSublevelID {
            return progress?.actual_game ?? 0
        }
        else {
            return 0
        }
    }
}
