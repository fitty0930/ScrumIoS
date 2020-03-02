//
//  QuizGameViewController.swift
//  scrum-ios
//
//  Created by Matias Glessi on 8/29/18.
//  Copyright © 2018 Matias Glessi. All rights reserved.
//

import UIKit

class QuizGameViewController: UIViewController, BaseVMDelegate {
    
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var questionLabel: UILabel!
    
    let viewModel = ContentVM()
    var game: Game?
    weak var gameDelegate: GameManagerDelegate?
    var correctAnswerSelected = false
    
    var isFirstAnswer = true
    
    var gameTimer: Timer?
    var secondsSpent = 0
    
    var info: GameInfo?

    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.viewModel.delegate = self
        self.viewModel.quizVM = true
        tableView?.dataSource = viewModel
        tableView.delegate = viewModel
        tableView?.estimatedRowHeight = 100
        tableView?.rowHeight = UITableViewAutomaticDimension
        tableView?.register(VideoItemCell.nib, forCellReuseIdentifier: VideoItemCell.identifier)
        tableView?.register(ImageItemCell.nib, forCellReuseIdentifier: ImageItemCell.identifier)
        tableView?.register(TextItemCell.nib, forCellReuseIdentifier: TextItemCell.identifier)
        tableView?.register(TitleItemCell.nib, forCellReuseIdentifier: TitleItemCell.identifier)
        tableView?.register(AnswerItemCell.nib, forCellReuseIdentifier: AnswerItemCell.identifier)
        
        if let parentVC = self.parent as? GameViewController {
            
            self.game = parentVC.games[parentVC.currentGameIndex]
            self.viewModel.getContentFor(game: game!)
            self.questionLabel.text = game?.title ?? ""
            
            
        }
        
        if let dataSource = self.tableView.dataSource as? ContentVM {
            dataSource.optionBlock = { [weak self] (answerSelected) in
                guard let strongSelf = self else { return }
                guard let result = answerSelected.isCorrect else { return }
                
                strongSelf.correctAnswerSelected = result
            }
        }
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

    
    @IBAction func answerQuiz(_ sender: Any) {
        
        
        
        
        if correctAnswerSelected {
            
            
            if let info = info {
                if isFirstAnswer {
                    LogService.gameCorrectInFirstTryAnswer(level: info.level, sublevel: info.sublevel, game: info.game, time: secondsSpent)
                }
                else {
                    LogService.gameCorrectAnswer(level: info.level, sublevel: info.sublevel, game: info.game, time: secondsSpent)
                }
            }

        
            let alertController = UIAlertController(title: "Excelente!", message: "La respuesta es correcta 🤓", preferredStyle: UIAlertControllerStyle.alert)
            
            let okAction = UIAlertAction(title: "Ok", style: UIAlertActionStyle.default, handler: {
                alert -> Void in
                self.gameDelegate?.prepareForNextGame()
                self.stopTimer()

            })
            
            alertController.addAction(okAction)
            
            self.present(alertController, animated: true, completion: nil)

        }
        else {
            
            if let info = info {
                LogService.gameWrongAnswer(level: info.level, sublevel: info.sublevel, game: info.game, time: secondsSpent)
            }
            
            isFirstAnswer = false

            let alertController = UIAlertController(title: "Incorrecto!", message: "La respuesta es incorrecta 💩 Inténtalo de nuevo!", preferredStyle: UIAlertControllerStyle.alert)

            alertController.addAction(UIAlertAction.init(title: "Aceptar", style: .default, handler: nil))
            
            self.present(alertController, animated: true, completion: nil)

        }
        
        
        
    }
    
    func didFinishTask(sender: BaseVM, errorMessage: String?, dataArray: [NSObject]?) {
        self.tableView.reloadData()
    }
}
