//
//  VelocityGameViewController.swift
//  scrum-ios
//
//  Created by Matias on 23/09/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import UIKit

class VelocityGameViewController: UIViewController, Storyboarded, VelocityGameDelegate {

    weak var gameDelegate: GameManagerDelegate?
    @IBOutlet weak var containerView: UIView!
    
    var gameTimer: Timer?
    var secondsSpent = 0
    
    var info: GameInfo?
    var estimation = 0
    var finalResult = 0
    
    // Asking Estimation Step
    private lazy var askingEstimationViewController
        : AskingEstimationViewController = {
        let storyboard = UIStoryboard(name: "Tutorial", bundle: Bundle.main)
        var viewController = storyboard.instantiateViewController(withIdentifier: "AskingEstimationViewController") as! AskingEstimationViewController
        viewController.velocityGameDelegate = self
        self.add(asChildViewController: viewController)
        return viewController
    }()
    
    // SpaceGame Step
    private lazy var spaceGameViewController: SpaceGameViewController = {
        let storyboard = UIStoryboard(name: "Tutorial", bundle: Bundle.main)
        var viewController = storyboard.instantiateViewController(withIdentifier: "SpaceGameViewController") as! SpaceGameViewController
        viewController.velocityGameDelegate = self
        viewController.estimatedResult = estimation
        self.add(asChildViewController: viewController)
        return viewController
    }()
    
    // Explanation Step
    private lazy var explanationViewController: ExplanationViewController = {
        let storyboard = UIStoryboard(name: "Tutorial", bundle: Bundle.main)
        var viewController = storyboard.instantiateViewController(withIdentifier: "ExplanationViewController") as! ExplanationViewController
        viewController.velocityGameDelegate = self
        viewController.finalResult = finalResult
        viewController.estimation = estimation
        self.add(asChildViewController: viewController)
        return viewController
    }()
    
    // Explanation Step
    private lazy var finalExplanationViewController: FinalExplanationViewController = {
        let storyboard = UIStoryboard(name: "Tutorial", bundle: Bundle.main)
        var viewController = storyboard.instantiateViewController(withIdentifier: "FinalExplanationViewController") as! FinalExplanationViewController
        viewController.velocityGameDelegate = self
        self.add(asChildViewController: viewController)
        return viewController
    }()

    
    override func viewDidLoad() {
        super.viewDidLoad()
        move(to: .askingEstimate)
        startTimer()
    }
    
    
    func startTimer(){
        gameTimer = Timer.scheduledTimer(timeInterval: 1, target: self, selector: #selector(updateTimer), userInfo: nil, repeats: true)
    }
    
    @objc func updateTimer() {
        secondsSpent += 1
        print("Game Timer: ", secondsSpent)

    }
    
    func stopTimer(){
        gameTimer?.invalidate()
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
    
    
    func move(to step: VelocityGameStep) {
        switch step {
        case .askingEstimate:
            add(asChildViewController: askingEstimationViewController)
        case .spaceGame:
            remove(asChildViewController: askingEstimationViewController)
            add(asChildViewController: spaceGameViewController)
        case .explanation:
            remove(asChildViewController: spaceGameViewController)
            add(asChildViewController: explanationViewController)
        case .finalExplanation:
            remove(asChildViewController: explanationViewController)
            add(asChildViewController: finalExplanationViewController)
        case .nextGame:
            stopTimer()
            if let info = info {
                LogService.gameCorrectAnswer(level: info.level, sublevel: info.sublevel, game: info.game, time: secondsSpent)
            }
            gameDelegate?.prepareForNextGame()
        }
    }
    
    func setEstimation(_ value: Int) {
        estimation = value
    }
    
    func setFinalResult(_ value: Int) {
        finalResult = value
    }
    

}

protocol VelocityGameDelegate: class {
    func move(to step: VelocityGameStep)
    func setEstimation(_ value: Int)
    func setFinalResult(_ value: Int)
}

enum VelocityGameStep {
    case askingEstimate
    case spaceGame
    case explanation
    case finalExplanation
    case nextGame
}
