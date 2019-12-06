//
//  GameViewController.swift
//  scrum-ios
//
//  Created by Matias Glessi on 8/29/18.
//  Copyright © 2018 Matias Glessi. All rights reserved.
//

import UIKit
import Bartinter
import FirebaseAuth

class GameViewController: UIViewController, GameManagerDelegate, Storyboarded {

    @IBOutlet weak var progressBar: GradientProgressBar!
    @IBOutlet weak var containerView: UIView!
    var games: [Game] = []
    var currentGame: Game?
    var currentGameIndex: Int = 0
    
//    var gameTimeTimer: Timer?
//    var secondsSpent = 0
    
    
    weak var coordinator: GameCoordinator?
    
    // Draggable Scrum Flow Game
    private lazy var scrumFlowViewController: DraggableScrumFlowViewController = {
        let storyboard = UIStoryboard(name: "Tutorial", bundle: Bundle.main)
        var viewController = storyboard.instantiateViewController(withIdentifier: "DraggableScrumFlowViewController") as! DraggableScrumFlowViewController
        viewController.gameDelegate = self
        
        if let levelValue = self.coordinator?.levelValue,
            let sublevelValue = self.coordinator?.sublevelValue {
            viewController.info = GameInfo.init(level: levelValue, sublevel: sublevelValue, game: currentGameIndex)
        }
        
        self.add(asChildViewController: viewController)
        return viewController
    }()
    
    // Tag Selector Game
    private lazy var tagSelectorViewController: DraggableTextGameViewController = {
        let storyboard = UIStoryboard(name: "Tutorial", bundle: Bundle.main)
        var viewController = storyboard.instantiateViewController(withIdentifier: "DraggableTextGameViewController") as! DraggableTextGameViewController
        viewController.gameDelegate = self
        
        if let levelValue = self.coordinator?.levelValue,
            let sublevelValue = self.coordinator?.sublevelValue {
            viewController.info = GameInfo.init(level: levelValue, sublevel: sublevelValue, game: currentGameIndex)
        }
        
        self.add(asChildViewController: viewController)
        return viewController
    }()

    
    // Velocity Game
    private lazy var velocityGameViewController: VelocityGameViewController = {
        let storyboard = UIStoryboard(name: "Tutorial", bundle: Bundle.main)
        var viewController = storyboard.instantiateViewController(withIdentifier: "VelocityGameViewController") as! VelocityGameViewController
        viewController.gameDelegate = self
        
        if let levelValue = self.coordinator?.levelValue,
            let sublevelValue = self.coordinator?.sublevelValue {
            viewController.info = GameInfo.init(level: levelValue, sublevel: sublevelValue, game: currentGameIndex)
        }
        self.add(asChildViewController: viewController)
        return viewController
    }()
    

    // Generic Quiz Game
    private lazy var quizViewController: QuizGameViewController = {
        let storyboard = UIStoryboard(name: "Tutorial", bundle: Bundle.main)
        var viewController = storyboard.instantiateViewController(withIdentifier: "QuizGameViewController") as! QuizGameViewController
        viewController.gameDelegate = self
        
        if let levelValue = self.coordinator?.levelValue,
            let sublevelValue = self.coordinator?.sublevelValue {
            viewController.info = GameInfo.init(level: levelValue, sublevel: sublevelValue, game: currentGameIndex)
        }
        self.add(asChildViewController: viewController)
        return viewController
    }()
    
    
    // Squared Quiz Game (4 squares)
    private lazy var squaredQuizViewController: SquaredQuizGameViewController = {
        let storyboard = UIStoryboard(name: "Tutorial", bundle: Bundle.main)
        var viewController = storyboard.instantiateViewController(withIdentifier: "SquaredQuizGameViewController") as! SquaredQuizGameViewController
        viewController.gameDelegate = self
        viewController.squaresType = .fourSquares
        
        if let levelValue = self.coordinator?.levelValue,
            let sublevelValue = self.coordinator?.sublevelValue {
            viewController.info = GameInfo.init(level: levelValue, sublevel: sublevelValue, game: currentGameIndex)
        }
        self.add(asChildViewController: viewController)
        return viewController
    }()

    // Squared Quiz Game (2 squares)
    private lazy var squaredQuizViewController2: SquaredQuizGameViewController = {
        let storyboard = UIStoryboard(name: "Tutorial", bundle: Bundle.main)
        var viewController = storyboard.instantiateViewController(withIdentifier: "SquaredQuizGameViewController") as! SquaredQuizGameViewController
        viewController.gameDelegate = self
        viewController.squaresType = .twoSquares
        
        if let levelValue = self.coordinator?.levelValue,
            let sublevelValue = self.coordinator?.sublevelValue {
            viewController.info = GameInfo.init(level: levelValue, sublevel: sublevelValue, game: currentGameIndex)
        }
        self.add(asChildViewController: viewController)
        return viewController
    }()
    
    // Planning Poker Game
    private lazy var planningPokerGameViewController: PlanningPokerGameViewController = {
        let storyboard = UIStoryboard(name: "Tutorial", bundle: Bundle.main)
        var viewController = storyboard.instantiateViewController(withIdentifier: "PlanningPokerGameViewController") as! PlanningPokerGameViewController
        viewController.gameDelegate = self
        
        if let levelValue = self.coordinator?.levelValue,
            let sublevelValue = self.coordinator?.sublevelValue {
            viewController.info = GameInfo.init(level: levelValue, sublevel: sublevelValue, game: currentGameIndex)
        }
        self.add(asChildViewController: viewController)
        return viewController
    }()

    
    override func viewDidLoad() {
        super.viewDidLoad()
        updatesStatusBarAppearanceAutomatically = true
        configureProgressBar()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        currentGame = games[currentGameIndex]
        prepareFor(game: currentGame)
    }
////
////    func startTimer(){
////        gameTimeTimer = Timer.scheduledTimer(timeInterval: 1, target: self, selector: #selector(updateTimer), userInfo: nil, repeats: true)
////    }
////
////    @objc func updateTimer() {
////        secondsSpent += 1
////        print("Game Timer: ", secondsSpent)
////    }
////
////    fileprivate func endTimerAndLogTime(){
////        gameTimeTimer?.invalidate()
////        let time = secondsSpent
////        
////        secondsSpent = 0
////
////        logGameTimeSpent(with: time)
////    }
//
//    fileprivate func logGameTimeSpent(with time: Int) {
//
//        if let levelValue = self.coordinator?.levelValue,
//            let sublevelValue = self.coordinator?.sublevelValue {
//            LogService.gameTimeSpent(level: levelValue, sublevel: sublevelValue, game: currentGameIndex, time: time)
//        }
//    }
    
    private func configureProgressBar() {
        progressBar.gradientColors = [UIColor(red:0.00, green:1.00, blue:1.00, alpha:1.0).cgColor, UIColor(red:0.58, green:0.15, blue:0.56, alpha:1.0).cgColor]
        progressBar.setProgress(getCurrentProgress(), animated: false)
        progressBar.trackTintColor = UIColor.lightGray
    }
    
    fileprivate func stopCurrentGameTimer() {
        
        if let currentGame = currentGame {
            switch currentGame.gameType {
                
            case .quiz:
                if let vc = childViewControllers.compactMap({ $0 as? QuizGameViewController }).first {
                    vc.stopTimer()
                }
        
            case .twoSquaresImageQuiz, .twoSquaresTextQuiz,
                 .fourSquaresImageQuiz, .fourSquaresTextQuiz,
                 .buttonsQuiz:
                if let vc = childViewControllers.compactMap({ $0 as? SquaredQuizGameViewController }).first {
                    vc.stopTimer()
                }
                
            case .draggableScrumFlow:
                if let vc = childViewControllers.compactMap({ $0 as? DraggableScrumFlowViewController }).first {
                    vc.stopTimer()
                }
                
            case .selectableTags:
                if let vc = childViewControllers.compactMap({ $0 as?
                    DraggableTextGameViewController }).first {
                    vc.stopTimer()
                }
                
            case .velocityGame:
                if let vc = childViewControllers.compactMap({ $0 as? VelocityGameViewController }).first {
                    vc.stopTimer()
                }
            case .planningPoker:
                if let vc = childViewControllers.compactMap({ $0 as?
                    PlanningPokerGameViewController }).first {
                    vc.stopTimer()
                }

            }
        }
    }
    
    @IBAction func close(_ sender: Any) {
        
        
        
        let alertController = UIAlertController(title: "Estas seguro de salir?", message: "Si sales perderas el progreso del juego actual.", preferredStyle: .alert)
        
        let cancelAction = UIAlertAction.init(title: "Cancelar", style: .cancel, handler: nil)
        
        let defaultAction = UIAlertAction.init(title: "Aceptar", style: .default) { (_) in
            self.stopCurrentGameTimer()
            self.coordinator?.didExitCurrentGame()
        }
        
        alertController.addAction(cancelAction)
        alertController.addAction(defaultAction)
        self.present(alertController, animated: true, completion: nil)

    }
    
    private func getCurrentProgress() -> Float {
        let total = games.count == 0 ? 1 : games.count
        return Float(currentGameIndex)/Float(total)
    }
    
    // MARK: - GameManagerDelegate

    func prepareForNextGame() {
//        self.endTimerAndLogTime()
        self.saveProgress()
        self.prepareNextViewController()
    }
    
    
    // MARK: - Private Methods

    private func removeCurrentGame() {
        
        if let currentGame = currentGame {
            switch currentGame.gameType {
            case .quiz:
                remove(asChildViewController: quizViewController)
            case .draggableScrumFlow:
                remove(asChildViewController: scrumFlowViewController)
            case .buttonsQuiz:
                remove(asChildViewController: squaredQuizViewController)
            case .twoSquaresImageQuiz:
                remove(asChildViewController: squaredQuizViewController2)
            case .fourSquaresImageQuiz:
                remove(asChildViewController: squaredQuizViewController)
            case .twoSquaresTextQuiz:
                remove(asChildViewController: squaredQuizViewController2)
            case .fourSquaresTextQuiz:
                remove(asChildViewController: squaredQuizViewController)
            case .selectableTags:
                remove(asChildViewController: tagSelectorViewController)
            case .velocityGame:
                remove(asChildViewController: velocityGameViewController)
            case .planningPoker:
                remove(asChildViewController: planningPokerGameViewController)
            }
        }
    }
    
    private func prepareNextViewController() {
        
        currentGameIndex += 1
        print("Current Game Index: ", currentGameIndex)
        progressBar.setProgress(getCurrentProgress(), animated: true)
        
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.7) {
            
            self.removeCurrentGame()
            
            if self.currentGameIndex < self.games.count {
                print("Sublevel not completed yet. Preparing next game!")
                self.currentGame = self.games[self.currentGameIndex]
                self.prepareFor(game: self.currentGame)
            }
            else {
                print("Sublevel Completed!")
                self.saveProgress()
                self.saveProgressSublevelCompleted()
                if let sublevel = self.coordinator?.sublevelValue {
                    self.coordinator?.didFinishAllGames(forSublevel: sublevel)
                }
            }

        }

    }
    
    
    
    func prepareFor(game: Game?) {
//
//        startTimer()
        
        if let currentGame = game {
            switch currentGame.gameType {
            case .quiz:
                add(asChildViewController: quizViewController)
            case .draggableScrumFlow:
                add(asChildViewController: scrumFlowViewController)
            case .buttonsQuiz:
                add(asChildViewController: squaredQuizViewController)
            case .twoSquaresImageQuiz:
                add(asChildViewController: squaredQuizViewController2)
            case .fourSquaresImageQuiz:
                add(asChildViewController: squaredQuizViewController)
            case .twoSquaresTextQuiz:
                add(asChildViewController: squaredQuizViewController2)
            case .fourSquaresTextQuiz:
                add(asChildViewController: squaredQuizViewController)
            case .selectableTags:
                add(asChildViewController: tagSelectorViewController)
            case .velocityGame:
                add(asChildViewController: velocityGameViewController)
            case .planningPoker:
                add(asChildViewController: planningPokerGameViewController)

            }
        }
    }
    
    
    private func saveProgressSublevelCompleted(){
        if let levelValue = self.coordinator?.levelValue {
            
            let newProgress = UserLevelsService.getProgressForNewLevelAfter(levelValue)
            RealmService.saveProgress(with: newProgress)
            UserLevelsService.updateLevel(level: "level_\(levelValue+1)", for: Auth.auth().currentUser?.email ?? "", with: newProgress)
        }
    }
    
    
    private func saveProgress() {
        
        if let levelValue = self.coordinator?.levelValue,
            let sublevelValue = self.coordinator?.sublevelValue {
            
            let newProgress: [String : Any] = [
                "level_number": levelValue,
                "actual_sublevel": sublevelValue,
                "tutorial_completed": true,
                "actual_game": currentGameIndex == games.count ? currentGameIndex : currentGameIndex + 1,
                "total_games": games.count,
                "status": ConstantsHelper.LevelStatus.started
            ]
            
            RealmService.saveProgress(with: newProgress)
            UserLevelsService.updateLevel(level: "level_\(levelValue)", for: Auth.auth().currentUser?.email ?? "", with: newProgress)
        }
    }
    
    private func remove(asChildViewController viewController: UIViewController) {
        viewController.willMove(toParentViewController: nil)
        viewController.view.removeFromSuperview()
        viewController.removeFromParentViewController()
    }
        
    private func add(asChildViewController viewController: UIViewController) {
        addChildViewController(viewController)
        self.containerView.addSubview(viewController.view)
        viewController.view.frame = self.containerView.frame
        viewController.didMove(toParentViewController: self)
    }
}


protocol GameManagerDelegate: class {
    func prepareForNextGame()
}


struct SublevelCompletedInfo {
    var newPercentage: Int
    var sublevelNumber: Int
    
}

struct GameInfo {
    
    var level: Int
    var sublevel: Int
    var game: Int
    
}
