//
//  PlanningPokerGameViewController.swift
//  scrum-ios
//
//  Created by Matias on 12/10/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import UIKit

class PlanningPokerGameViewController: UIViewController, Storyboarded, PlanningPokerGameDelegate {

    weak var gameDelegate: GameManagerDelegate?
    @IBOutlet weak var containerView: UIView!
    
    var info: GameInfo?
    var gameTimer: Timer?
    var secondsSpent = 0
    var selectedCard = ""
    var otherPlayerCard = ""

    
    // ProductBacklog Step
    private lazy var productBacklogViewController
        : ProductBacklogViewController = {
            let storyboard = UIStoryboard(name: "Tutorial", bundle: Bundle.main)
            var viewController = storyboard.instantiateViewController(withIdentifier: "ProductBacklogViewController") as! ProductBacklogViewController
            viewController.ppGameDelegate = self
            self.add(asChildViewController: viewController)
            return viewController
    }()
    
    // Pivot Step
    private lazy var pivotViewController
        : PivoteViewController = {
            let storyboard = UIStoryboard(name: "Tutorial", bundle: Bundle.main)
            var viewController = storyboard.instantiateViewController(withIdentifier: "PivoteViewController") as! PivoteViewController
            viewController.ppGameDelegate = self
            self.add(asChildViewController: viewController)
            return viewController
    }()

    // PBI Estimation Step
    private lazy var pbiEstimationViewController
        : PBIEstimationViewController = {
            let storyboard = UIStoryboard(name: "Tutorial", bundle: Bundle.main)
            var viewController = storyboard.instantiateViewController(withIdentifier: "PBIEstimationViewController") as! PBIEstimationViewController
            viewController.ppGameDelegate = self
            self.add(asChildViewController: viewController)
            return viewController
    }()
    
    // Cards Shown Step
    private lazy var cardsSelectionViewController
        : CardSelectionViewController = {
            let storyboard = UIStoryboard(name: "Tutorial", bundle: Bundle.main)
            var viewController = storyboard.instantiateViewController(withIdentifier: "CardSelectionViewController") as! CardSelectionViewController
            viewController.ppGameDelegate = self
            viewController.myCardValue = selectedCard
            self.add(asChildViewController: viewController)
            return viewController
    }()

    
    // Confrontation Step
    private lazy var confrontationViewController
        : ConfrontationViewController = {
            let storyboard = UIStoryboard(name: "Tutorial", bundle: Bundle.main)
            var viewController = storyboard.instantiateViewController(withIdentifier: "ConfrontationViewController") as! ConfrontationViewController
            viewController.ppGameDelegate = self
            viewController.myCardStringValue = selectedCard
            viewController.player3CardStringValue = otherPlayerCard
            self.add(asChildViewController: viewController)
            return viewController
    }()

    // Conclusion Step
    private lazy var conclusionViewController
        : ConclusionViewController = {
            let storyboard = UIStoryboard(name: "Tutorial", bundle: Bundle.main)
            var viewController = storyboard.instantiateViewController(withIdentifier: "ConclusionViewController") as! ConclusionViewController
            viewController.ppGameDelegate = self
            self.add(asChildViewController: viewController)
            return viewController
    }()
    
    // SprintBacklog Step
    private lazy var sprintBacklogViewController
        : SprintBackogViewController = {
            let storyboard = UIStoryboard(name: "Tutorial", bundle: Bundle.main)
            var viewController = storyboard.instantiateViewController(withIdentifier: "SprintBackogViewController") as! SprintBackogViewController
            viewController.ppGameDelegate = self
            self.add(asChildViewController: viewController)
            return viewController
    }()


    
    override func viewDidLoad() {
        super.viewDidLoad()
        startTimer()
        move(to: .productBacklog)
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
    
    
    func move(to step: PlanningPokerGameStep) {
        
        switch step {
        case .productBacklog:
            add(asChildViewController: productBacklogViewController)
        case .pivot:
            remove(asChildViewController: productBacklogViewController)
            add(asChildViewController: pivotViewController)
        case .pbiEstimation:
            remove(asChildViewController: pivotViewController)
            add(asChildViewController: pbiEstimationViewController)
        case .cardsShown:
            remove(asChildViewController: pbiEstimationViewController)
            add(asChildViewController: cardsSelectionViewController)
        case .confrontation:
            remove(asChildViewController: cardsSelectionViewController)
            add(asChildViewController: confrontationViewController)
        case .conclusion:
            remove(asChildViewController: confrontationViewController)
            add(asChildViewController: conclusionViewController)
        case .sprintBacklog:
            remove(asChildViewController: conclusionViewController)
            add(asChildViewController: sprintBacklogViewController)
        case .nextGame:
            stopTimer()
            if let info = info {
                LogService.gameCorrectAnswer(level: info.level, sublevel: info.sublevel, game: info.game, time: secondsSpent)
            }
            gameDelegate?.prepareForNextGame()
        }
    }
    
    func selected(card: String) {
        selectedCard = card
    }
    
    func setOtherPlayerCard(card: String) {
        otherPlayerCard = card
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

enum PlanningPokerGameStep {
    case productBacklog
    case pivot
    case pbiEstimation
    case cardsShown
    case confrontation
    case conclusion
    case sprintBacklog
    case nextGame
}

protocol PlanningPokerGameDelegate: class {
    func move(to step: PlanningPokerGameStep)
    func selected(card: String)
    func setOtherPlayerCard(card: String)
}

