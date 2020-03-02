//
//  TheoryCoordinator.swift
//  scrum-ios
//
//  Created by Matias on 06/04/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import UIKit
import FirebaseAuth

class TheoryCoordinator: Coordinator {
    
    weak var parentCoordinator: SublevelCoordinator?
    
    var childCoordinators = [Coordinator]()
    var steps = [Step]()
    var sublevel: SubLevel?
    var level: Level?
    var navigationController: UINavigationController
    
    init(navigationController: UINavigationController) {
        self.navigationController = navigationController
    }
    
    var tutorialTimeTimer: Timer?
    var secondsSpent = 0
    
    func start() {
        
        let vc = TheoryViewController.instantiate(for: ConstantsHelper.Storyboard.tutorial)
        vc.theorySteps = steps
        vc.sublevel = sublevel
        vc.coordinator = self
        navigationController.pushViewController(vc, animated: true)
        
        startTimer()
    }
    
    
    func startTimer(){
        tutorialTimeTimer = Timer.scheduledTimer(timeInterval: 1, target: self, selector: #selector(updateTimer), userInfo: nil, repeats: true)
    }
    
    @objc func updateTimer() {
        secondsSpent += 1
        print("Tutorial Timer: ", secondsSpent)

    }
    

    func didFinishTurorial(){
        stopTimerAndLogTime()
        addFinishedTutorialProgress()
        finishTutorial()
    }
    
    func didSkippedTutorial(){
        stopTimerAndLogTime()
        addFinishedTutorialProgress()
        logSkippedTutorial()
        finishTutorial()
    }
    
    func finishTutorial(){
        parentCoordinator?.didFinishTutorial(self)
    }
    
    func didExitTutorial(){
        tutorialTimeTimer?.invalidate()
        parentCoordinator?.didExitTutorial(self)
    }
    
    
    fileprivate func addFinishedTutorialProgress() {
        if let level = level, let sublvl = sublevel {
            
            let newProgress: [String : Any] = [
                "level_number": level.id ?? 0,
                "actual_sublevel": sublvl.id,
                "tutorial_completed": true,
                "actual_game": 0,
                "total_games": sublvl.games?.count ?? 1,
                "status": ConstantsHelper.LevelStatus.started
            ]
            
            RealmService.saveProgress(with: newProgress)
            UserLevelsService.updateLevel(level: "level_\(level.id ?? 0)", for: Auth.auth().currentUser?.email ?? "", with: newProgress)
        }
    }
    
    fileprivate func stopTimerAndLogTime(){
        tutorialTimeTimer?.invalidate()
        logTutorialTimeSpent()
    }
    
    
    fileprivate func logTutorialTimeSpent(){
        if let level = level, let sublvl = sublevel {
            LogService.tutorialTimeSpent(level: level.id ?? 0 , sublevel: sublvl.id, time: secondsSpent)
        }
    }
    
    fileprivate func logSkippedTutorial() {
        if let level = level, let sublvl = sublevel {
            LogService.tutorialSkipped(level: level.id ?? 0 , sublevel: sublvl.id)
        }
    }
}
