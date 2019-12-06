//
//  SquaredQuizGameViewController.swift
//  scrum-ios
//
//  Created by Matias Glessi on 9/5/18.
//  Copyright © 2018 Matias Glessi. All rights reserved.
//

import UIKit

class SquaredQuizGameViewController: UIViewController, BaseVMDelegate {

    @IBOutlet weak var questionTextView: UITextView!
    @IBOutlet weak var collectionView: UICollectionView!
    @IBOutlet weak var answerButton: UIView!

    let viewModel = SquaredQuizVM()
    var game: Game?
    var squaresType: SquaredQuizType?
    weak var gameDelegate: GameManagerDelegate?
    var correctAnswerSelected = false
    
    var isFirstAnswer = true
    
    var gameTimer: Timer?
    var secondsSpent = 0

    var info: GameInfo?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupAnswerTapGestureRecognizer()

        self.viewModel.delegate = self
        self.viewModel.type = squaresType!
        collectionView?.dataSource = viewModel
        collectionView.delegate = viewModel
        collectionView.register(QuizTextCell.nib, forCellWithReuseIdentifier: QuizTextCell.identifier)
        collectionView.register(QuizImageCell.nib, forCellWithReuseIdentifier: QuizImageCell.identifier)

        if let parentVC = self.parent as? GameViewController {

            self.game = parentVC.games[parentVC.currentGameIndex]
            self.viewModel.getContentFor(game: game!)
            self.questionTextView.attributedText = setAttributedLabelFor(text: game?.title ?? "")
        }

        if let dataSource = self.collectionView.dataSource as? SquaredQuizVM {
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
        print("1 -Game Timer: ", secondsSpent)

    }
    
    func stopTimer(){
        gameTimer?.invalidate()
    }
    

    
    func setupAnswerTapGestureRecognizer() {
        let tapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(answerQuiz(_:)))
        tapGestureRecognizer.numberOfTapsRequired = 1
        answerButton.addGestureRecognizer(tapGestureRecognizer)
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
        self.questionTextView.text = self.viewModel.question.data
        self.collectionView.reloadData()

    }

}


import Kingfisher

class QuizTextCell: UICollectionViewCell {
    
    @IBOutlet weak var selectorOutsideView: UIView!
    @IBOutlet weak var selectorInsideView: UIView!
    @IBOutlet weak var textLabel: UILabel!
    @IBOutlet weak var backView: UIView!
    
    var delegate: AnswerSelectionDelegate!

    
    
    var item: Content? {
        didSet {
            
            guard let item = item else { return }
            
            textLabel.text = item.data
            textLabel.textColor = UIColor.white
        }
    }
    
    override func awakeFromNib() {
        selectorInsideView.round()
        selectorOutsideView.round()
        selectorInsideView.hide()
        backView.backgroundColor = UIColor.clear
        let backgroundLayer = Colors.init(type: .random).gl
        backgroundLayer.frame = backView.frame
        backView.layer.insertSublayer(backgroundLayer, at: 0)
        backView.layer.cornerRadius = 20
        backView.clipsToBounds = true    
    }
    
    
    override var isSelected: Bool {
        
        didSet {
            if self.isSelected {
                self.backView.setBorder(width: 1, color: UIColor.darkGray.cgColor)
                self.selectorInsideView.show()
                self.delegate?.selectedOption(answer: self.item)

            }
            else {
                self.backView.setBorder(width: 0)
                self.selectorInsideView.hide()
            }
        }
        
    }
    
}


class QuizImageCell: UICollectionViewCell {
    
    @IBOutlet weak var selectorOutsideView: UIView!
    @IBOutlet weak var selectorInsideView: UIView!

    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var backView: UIView!
    var delegate: AnswerSelectionDelegate!

    
    var item: Content? {
        didSet {
            
            guard let _ = item else { return }
            
            imageView.contentMode = .scaleAspectFit
            imageView.kf.indicatorType = .activity
            
            // TODO: Set possible image?
        }
    }
    
    override func awakeFromNib() {
        selectorInsideView.round()
        selectorOutsideView.round()
        selectorInsideView.hide()
        backView.backgroundColor = UIColor.clear
        let backgroundLayer = Colors.init(type: .random).gl
        backgroundLayer.frame = backView.frame
        backView.layer.insertSublayer(backgroundLayer, at: 0)
        backView.layer.cornerRadius = 20
        backView.clipsToBounds = true
    }
    
    
    override var isSelected: Bool {
        
        didSet {
            if self.isSelected {
                self.backView.setBorder(width: 1, color: UIColor.darkGray.cgColor)
                self.selectorInsideView.show()
                self.delegate?.selectedOption(answer: self.item)
                
            }
            else {
                self.backView.setBorder(width: 0)
                self.selectorInsideView.hide()
            }
        }
        
    }
}



