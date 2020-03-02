//
//  DraggableTextGameViewController.swift
//  scrum-ios
//
//  Created by Matias on 26/08/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import UIKit

class DraggableTextGameViewController: UIViewController, Storyboarded {
    
    @IBOutlet weak var questionLabel: UILabel!
    @IBOutlet weak var possibleAnswersView: UIView!
    var game: Game?
    weak var gameDelegate: GameManagerDelegate?

    var isFirstAnswer = true
    
    var gameTimer: Timer?
    var secondsSpent = 0
    
    var info: GameInfo?

    
    let possibleAnswers = ["Product Owner", "Project Manager", "Scrum Master", "Scrum Team Member", "Other stackholders"]
    let answers = ["Product Owner", "Project Manager"]
    
    var allTags = [Tag]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        startTimer()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        if let parentVC = self.parent as? GameViewController {
            game = parentVC.games[parentVC.currentGameIndex]
            questionLabel.text = game?.title ?? ""
            //            questionLabel.attributedText = setAttributedLabelFor(text: game?.title ?? "", and: "\nSelecciona los elementos\ncorrespondientes")
            createCenteredTagCloud(OnView: possibleAnswersView)
        }

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

    
    
    func createCenteredTagCloud(OnView view: UIView){
        guard let game = game else { return }
        
        
        for tempView in possibleAnswersView.subviews {
            if tempView.tag != 0 {
                tempView.removeFromSuperview()
            }
        }
        let font = UIFont(name:"GothamRounded-Bold", size: 17.0)
        let tagHeight: CGFloat = 35.0
        let addedSpaceExternal: CGFloat = 20.0
        var tag: Int = 1
        var ypos: CGFloat = 30.0
        for contentItem in game.content  {
            let width = contentItem.data.widthOfString(usingFont: font!)
            let tagView = Tag.init(with: contentItem, xPos: 15.0, yPos: ypos, width: width, tag: tag)
            tagView.center = CGPoint(x: UIScreen.main.bounds.size.width/2, y: ypos)
            possibleAnswersView.addSubview(tagView)
            tag = tag  + 1
            allTags.append(tagView)
            ypos = ypos + tagHeight + addedSpaceExternal
        }
    }
    
    
    func createTagCloud(OnView view: UIView) {
        
        
        guard let game = game else { return }
        
        
        for tempView in view.subviews {
            if tempView.tag != 0 {
                tempView.removeFromSuperview()
            }
        }
        let font = UIFont(name:"verdana", size: 17.0)
        
        let addedSpaceInternal: CGFloat = 17.0
        let addedSpaceExternal: CGFloat = 10.0
        let tagHeight: CGFloat = 35.0
        var xPos:CGFloat = 15.0
        var ypos: CGFloat = 30.0
        var tag: Int = 1
        for contentItem in game.content  {
            
            let width = contentItem.data.widthOfString(usingFont: font!)
            let checkWholeWidth = CGFloat(xPos) + CGFloat(width)
            if checkWholeWidth > UIScreen.main.bounds.size.width - 30.0 {
                xPos = 15.0
                ypos = ypos + tagHeight + addedSpaceExternal
            }
            
            let tagView = Tag.init(with: contentItem, xPos: xPos, yPos: ypos, width: width, tag: tag)
            
            xPos = CGFloat(xPos) + CGFloat(width) + addedSpaceInternal + addedSpaceExternal
            view.addSubview(tagView)
            tag = tag  + 1
            allTags.append(tagView)
        }
    }
    
    @IBAction func sendAnswer(_ sender: Any) {
        
        
        if isAnswerValid() {
            
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

    
    
    
    private func isAnswerValid() -> Bool {
        
        for tag in allTags {
            guard let result = tag.content.isCorrect else { return false }
            if tag.isSelected && !result { return false }
            if !tag.isSelected && result { return false }
        }
        return true
    }
    
    

}


class Tag: UIView {
    
    var textLabel = UILabel()
    let font = UIFont(name:"GothamRounded-Bold", size: 17.0)
    let addedSpaceInternal: CGFloat = 17.0
    let addedSpaceExternal: CGFloat = 10.0
    var isSelected: Bool = false
    var content: Content = Content.init()
    
    public init(with content: Content, xPos: CGFloat, yPos: CGFloat, width: CGFloat, tag: Int) {
        super.init(frame: CGRect(x: xPos, y: yPos, width: width + addedSpaceInternal , height: 35.0))
        self.layer.cornerRadius = 14.5
        self.content = content
        self.backgroundColor = UIColor.white
        self.setBorder(width: 1, color: UIColor(red: 33.0/255.0, green: 135.0/255.0, blue:199.0/255.0, alpha: 1.0).cgColor)
        self.tag = tag
        textLabel = UILabel(frame: CGRect(x: 9.0, y: 0.0, width: width, height: self.frame.size.height))
        
        textLabel.font = font
        textLabel.text = content.data
        textLabel.textColor = UIColor(red: 33.0/255.0, green: 135.0/255.0, blue:199.0/255.0, alpha: 1.0)
        textLabel.textAlignment = .center
        self.addSubview(textLabel)
        
        setupTapGestureRecognizer()
    }
    
    required public init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func setupTapGestureRecognizer() {
        let tapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(tapGestureRecognized))
        tapGestureRecognizer.numberOfTapsRequired = 1
        addGestureRecognizer(tapGestureRecognizer)
    }
    
    // Tap Gesture
    @objc func tapGestureRecognized() {
        
        if isSelected {
            backgroundColor = UIColor.white
            textLabel.textColor = UIColor(red: 33.0/255.0, green: 135.0/255.0, blue:199.0/255.0, alpha: 1.0)
            isSelected = false
        }
        else {
            backgroundColor = UIColor(red: 33.0/255.0, green: 135.0/255.0, blue:199.0/255.0, alpha: 1.0)
            textLabel.textColor = UIColor.white
            isSelected = true
        }
        
    }
    
}

