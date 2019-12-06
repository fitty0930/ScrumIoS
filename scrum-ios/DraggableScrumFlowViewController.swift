
//
//  DraggableScrumFlowViewController.swift
//  scrum-ios
//
//  Created by Matias on 17/09/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//


import UIKit
import EasyTipView
import Bartinter
import SwiftEntryKit
import Foundation

class DraggableScrumFlowViewController: UIViewController, DraggableViewDelegate, EasyTipViewDelegate, Storyboarded {
    
    
    @IBOutlet weak var titleLabel: UILabel!
    weak var gameDelegate: GameManagerDelegate?
    
    @IBOutlet weak var containerView: UIView!
    
    var viewsSetted: Int = 0
    var presentedToolTip: EasyTipView?
    var dashedViews = [UIViewWithDashedLineBorder]()
    
    var originX: CGFloat = 5
    var originY: CGFloat = 250

    var gameTimer: Timer?
    var secondsSpent = 0
    
    var info: GameInfo?

    
    override func viewDidLoad() {
        super.viewDidLoad()
        updatesStatusBarAppearanceAutomatically = true
        titleLabel.attributedText = setAttributedLabelFor(text: "Completa el flujo de Scrum!", and: "\nArrastra los elementos\na su lugar correspondiente")
        var x: CGFloat = 15
        var point: CGPoint = CGPoint.init()
        var size: CGSize = CGSize.init()
        
        let lowerScreenReductor: CGFloat = UIScreen.main.bounds.width < 400 ? 15 : 0
        let arrow2Height: CGFloat = 181 - lowerScreenReductor
        
        let separation: CGFloat = 10
    
        print("WIDTH", UIScreen.main.bounds.width)
        
        size = CGSize.init(width: 47 - lowerScreenReductor, height: 75 - lowerScreenReductor)
        
        let productBacklogImage = UIImageView.init(frame: CGRect.init(x: x, y: arrow2Height - 40, width: 47 - lowerScreenReductor, height: 75 - lowerScreenReductor))
        productBacklogImage.image = UIImage.init(named: "L1_prodBacklog")
        
        point = CGPoint.init(x: originX, y: originY)
        originX += productBacklogImage.bounds.width + 10
        
        let productBacklogImage2 = DraggableImageView.init(frame: CGRect.init(origin: point, size: size),
                                                  image: UIImage.init(named: "L1_prodBacklog"),
                                                  finalLocation: productBacklogImage.center,
                                                  tooltipText:  "Excelente! El Product Backlog es el lugar donde figuran todas las tareas que el producto requiere desarrollar.",
                                                  delegate: self,
                                                  tag: 0)
        self.containerView.addSubview(productBacklogImage2)
        self.dashedViews.append(createDashedView(for: productBacklogImage2))
        
        x += productBacklogImage2.bounds.width + separation

        size = CGSize.init(width: 108.5, height: 25)

        
        let dailyMeetingImage = UIImageView.init(frame: CGRect.init(x: x - lowerScreenReductor, y: separation , width: 108.5, height: 25))
        dailyMeetingImage.image = UIImage.init(named: "L1_daily")
        
        
        point = getPointForDraggableView(dailyMeetingImage)

        let dailyMeetingImage2 = DraggableImageView.init(frame: CGRect.init(origin: point, size: size),
                                                           image: UIImage.init(named: "L1_daily"),
                                                           finalLocation: dailyMeetingImage.center,
                                                           tooltipText:  "Genial! La Daily Scrum Meeting es la reunion diaria donde se sincroniza el equipo sobre el estado de cada uno de sus miembros. Aprenderás sobre ella más adelante! 😊",
                                                           delegate: self,
                                                           tag: 1)
        self.containerView.addSubview(dailyMeetingImage2)
        self.dashedViews.append(createDashedView(for: dailyMeetingImage2))
        
        
        
        let firstArrowImage = UIImageView.init(frame: CGRect.init(x: x, y: arrow2Height - 40 + lowerScreenReductor , width: 50 - lowerScreenReductor, height: 50 - lowerScreenReductor))
        firstArrowImage.image = UIImage.init(named: "scrumFlow_arrow1")

        x += firstArrowImage.bounds.width + separation
        
        size = CGSize.init(width: 47 - lowerScreenReductor, height: 75 - lowerScreenReductor)


        let sprinBacklogImage = UIImageView.init(frame: CGRect.init(x: x, y: arrow2Height - 40 , width: 47 - lowerScreenReductor, height: 75 - lowerScreenReductor))
        sprinBacklogImage.image = UIImage.init(named: "L1_sprintBacklog")

        point = getPointForDraggableView(sprinBacklogImage)

        let sprinBacklogImage2 = DraggableImageView.init(frame: CGRect.init(origin: point, size: size),
                                                         image: UIImage.init(named: "L1_sprintBacklog"),
                                                         finalLocation: sprinBacklogImage.center,
                                                         tooltipText:  "Perfecto! El Sprint Backlog es el lugar donde figuran todas las tareas que el equipo decidió que realizaran en esta iteracion.",
                                                         delegate: self,
                                                         tag: 2)
        self.containerView.addSubview(sprinBacklogImage2)
        self.dashedViews.append(createDashedView(for: sprinBacklogImage2))
        
        x += sprinBacklogImage.bounds.width
        


        let secondArrowImage = UIImageView.init(frame: CGRect.init(x: x, y: separation, width: 142 - lowerScreenReductor, height: arrow2Height))
        secondArrowImage.image = UIImage.init(named: "scrumFlow_arrow2")

        size = CGSize.init(width: 53.5, height: 57.5)

        
        let sprintImage = UIImageView.init(frame: CGRect.init(x: x + secondArrowImage.bounds.width/3 + 10, y: arrow2Height - 105 , width: 53.5, height: 57.5))
        sprintImage.image = UIImage.init(named: "L1_sprint")
        point = getPointForDraggableView(sprintImage)

        
        let sprintImage2 = DraggableImageView.init(frame: CGRect.init(origin: point, size: size),
                                                         image: UIImage.init(named: "L1_sprint"),
                                                         finalLocation: sprintImage.center,
                                                         tooltipText:  "Buenisimo! El Sprint es la iteracion en si. Esta puede durar de 2 a 4 semanas y es el tiempo en el que el equipo desarrolla las tareas que definio en el Sprint Backlog.",
                                                         delegate: self,
                                                         tag: 3)
        self.containerView.addSubview(sprintImage2)
        self.dashedViews.append(createDashedView(for: sprintImage2))
        
        x += secondArrowImage.bounds.width
        
        size = CGSize.init(width: 65 - lowerScreenReductor, height: 105 - lowerScreenReductor)


        let productIncrementImage = UIImageView.init(frame: CGRect.init(x: x, y: arrow2Height - 70  , width: 65 - lowerScreenReductor, height: 105 - lowerScreenReductor))
        productIncrementImage.image = UIImage.init(named: "L1_shipIncrement")
        
        point = getPointForDraggableView(productIncrementImage)

        let productIncrementImage2 = DraggableImageView.init(frame: CGRect.init(origin: point, size: size),
                                                   image: UIImage.init(named: "L1_shipIncrement"),
                                                   finalLocation: productIncrementImage.center,
                                                   tooltipText:  "Bien ahi! El producto incrementable es lo que se puede entregar al final de cada iteracion.",
                                                   delegate: self,
                                                   tag: 4)
        self.containerView.addSubview(productIncrementImage2)
        self.dashedViews.append(createDashedView(for: productIncrementImage2))

        self.containerView.addSubview(firstArrowImage)
        self.containerView.addSubview(secondArrowImage)

        setToolTipViewGlobalReferences()
        setTapGesture()
        startTimer()
    }
    
    
    func startTimer(){
        gameTimer = Timer.scheduledTimer(timeInterval: 1, target: self, selector: #selector(updateTimer), userInfo: nil, repeats: true)
    }
    
    @objc func updateTimer() {
        secondsSpent += 1
        print("2 - Game Timer: ", secondsSpent)
        
    }
    
    func stopTimer(){
        gameTimer?.invalidate()
    }
    

    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
    }
    
    
    
    override var preferredStatusBarStyle : UIStatusBarStyle {
        return UIStatusBarStyle.lightContent
    }
    
    fileprivate func setTapGesture() {
        let tap = UITapGestureRecognizer(target: self, action: #selector(containerViewTap))
        self.view.addGestureRecognizer(tap)
    }
    
    fileprivate func setToolTipViewGlobalReferences() {
        var preferences = EasyTipView.Preferences()
        preferences.drawing.font = UIFont(name: "Futura-Medium", size: 13)!
        preferences.drawing.foregroundColor = UIColor.white
        preferences.drawing.backgroundColor = UIColor(hue:0.46, saturation:0.99, brightness:0.6, alpha:1)
        preferences.drawing.arrowPosition = EasyTipView.ArrowPosition.top
        
        EasyTipView.globalPreferences = preferences
    }
    
    fileprivate func createDashedView(for view: DraggableImageView) -> UIViewWithDashedLineBorder {
        let targetView = UIViewWithDashedLineBorder(frame: CGRect(x: 50, y: 50.0, width: 30, height: 30))
        targetView.tag = view.tag
        targetView.center = view.finalLocation
        containerView.addSubview(targetView)
        return targetView
    }
    
    fileprivate func getPointForDraggableView(_ view: UIView) -> CGPoint {
        let newX = originX + view.bounds.width
        var point = CGPoint.init()
        if newX > UIScreen.main.bounds.width {
            originX = 5
            originY = originY + (75 - UIScreen.main.bounds.width < 400 ? 15 : 0) + 15
        }
        print(CGPoint.init(x: originX, y: originY))
        point = CGPoint.init(x: originX, y: originY)
        originX = newX + 5

        return point
    }
 
    
    
    func easyTipViewDidDismiss(_ tipView: EasyTipView) {
        
        if let _ = self.presentedToolTip {
            self.presentedToolTip = nil
            checkIfAllSetted()
        }
    }
    
    
    @objc func containerViewTap(){
        self.dismissOldToolTipIfPresent()
    }
    
    
    func dismissOldToolTipIfPresent() {
        presentedToolTip?.dismiss()
    }
    
    
    func removeFinalPositionView(for tag: Int) {
        
        for view in dashedViews {
            if view.tag == tag {
                view.removeFromSuperview()
                break
            }
        }
    }
    
    func setted(view: UIView) {
        
        if let dView = view as? DraggableImageView {
            
            removeFinalPositionView(for: dView.tag)
            self.presentedToolTip = EasyTipView.init(text: dView.popTipText, delegate: self)
            self.presentedToolTip?.show(forView: view)
            viewsSetted += 1
            
            print("Views setted? \(viewsSetted)")
        }
    }
    
    
    func checkIfAllSetted(){
        
        print("checking if views are 5")
        
        if viewsSetted == 5 {
            
            if let info = info {
                LogService.gameCorrectAnswer(level: info.level, sublevel: info.sublevel, game: info.game, time: secondsSpent)
            }
            
            self.stopTimer()

            PopUpMessages.showCompletedTaskWithCompletion(with: "Nivel Completo!", description: "Has completado el nivel con exito! Felicitaciones 👏", buttonMessage: "Continuar", messageType: .taskCompleted, dismissAction: {
                self.gameDelegate?.prepareForNextGame()
            })
            
        }
    }
}

protocol DraggableViewDelegate: class {
    
    func setted(view: UIView)
    func dismissOldToolTipIfPresent()
}


class UIViewWithDashedLineBorder: UIView {
    
    override func draw(_ rect: CGRect) {
        
        let path = UIBezierPath(roundedRect: rect, cornerRadius: 0)
        
        UIColor.white.setFill()
        path.fill()
        
        UIColor(red:0.38, green:0.68, blue:0.67, alpha:1.0).setStroke()
        path.lineWidth = 5
        
        let dashPattern : [CGFloat] = [10, 4]
        path.setLineDash(dashPattern, count: 2, phase: 0)
        path.stroke()
    }
}

