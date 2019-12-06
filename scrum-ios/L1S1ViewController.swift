////
////  L1S1ViewController.swift
////  scrum-ios
////
////  Created by Matias Glessi on 4/22/17.
////  Copyright © 2017 Matias Glessi. All rights reserved.
////
//
//import UIKit
//import EasyTipView
//import Bartinter
//import SwiftEntryKit
//
//class L1S1ViewController: UIViewController, DraggableViewDelegate, EasyTipViewDelegate {
//
//    
//    weak var gameDelegate: GameManagerDelegate?
//    
//    @IBOutlet weak var elementsContainerView: UIView!
//    @IBOutlet weak var scrumFlowView: UIImageView!
//    @IBOutlet weak var containerView: UIView!
//    @IBOutlet weak var flowConstraintToTop: NSLayoutConstraint!
//    
//    
//    var viewsSetted: Int = 0
//    var presentedToolTip: EasyTipView?
//    var dashedViews = [UIViewWithDashedLineBorder]()
//    
//    override func viewDidLoad() {
//        super.viewDidLoad()
//        updatesStatusBarAppearanceAutomatically = true
//        let flowHeight =  self.scrumFlowView.bounds.height
//        
//        var x: CGFloat = 40.0
//        
//        let incrementDG = DraggableImageView.init(frame: CGRect.init(x: x, y: flowHeight + 50, width: 65, height: 105),
//                                             image: UIImage.init(named: "L1_shipIncrement"),
//                                             finalLocation: ConstantsHelper.getShippingIncrementOriginalPoint(),
//                                             tooltipText:  "Bien ahi! El producto incrementable es lo que se puede entregar al final de cada iteracion.",
//                                             delegate: self,
//                                             tag: 0)
//        self.containerView.addSubview(incrementDG)
//        self.dashedViews.append(createDashedView(for: incrementDG))
//        
//        x = x + incrementDG.bounds.width + CGFloat(40.0)
//        
//        let productBacklogDG = DraggableImageView.init(frame: CGRect.init(x: x , y: flowHeight + 50, width: 47, height: 75),
//                                                  image: UIImage.init(named: "L1_prodBacklog"),
//                                                  finalLocation: ConstantsHelper.getProductBacklogOriginalPoint(),
//                                                  tooltipText: "Excelente! El Product Backlog es el lugar donde figuran todas las tareas que el producto requiere desarrollar.",
//                                                  delegate: self,
//                                                  tag: 1)
//        self.containerView.addSubview(productBacklogDG)
//        self.dashedViews.append(createDashedView(for: productBacklogDG))
//        
//        x = x + productBacklogDG.bounds.width + CGFloat(40.0)
//        
//        let sprintBacklogDG = DraggableImageView.init(frame: CGRect.init(x: x, y: flowHeight + 50, width: 47, height: 75),
//                                                 image: UIImage.init(named: "L1_sprintBacklog"),
//                                                 finalLocation: ConstantsHelper.getSprintBacklogOriginalPoint(),
//                                                 tooltipText: "Perfecto! El Sprint Backlog es el lugar donde figuran todas las tareas que el equipo decidió que realizaran en esta iteracion.",
//                                                 delegate: self,
//                                                 tag: 2)
//        self.containerView.addSubview(sprintBacklogDG)
//        self.dashedViews.append(createDashedView(for: sprintBacklogDG))
//
//        let dailyDG = DraggableImageView.init(frame: CGRect.init(x: 50, y: flowHeight + 50 + incrementDG.bounds.height + 20, width: 108.5, height: 25),
//                                         image: UIImage.init(named: "L1_daily"),
//                                         finalLocation: ConstantsHelper.getDailyOriginalPoint(),
//                                         tooltipText: "Genial! La Daily Scrum Meeting es la reunion diaria donde se sincroniza el equipo sobre el estado de cada uno de sus miembros. Aprenderás sobre ella más adelante! 😊",
//                                         delegate: self,
//                                         tag: 3)
//        self.containerView.addSubview(dailyDG)
//        self.dashedViews.append(createDashedView(for: dailyDG))
//
//        let sprintDG = DraggableImageView.init(frame: CGRect.init(x: 50 + dailyDG.bounds.width + 20, y: flowHeight + 50 + incrementDG.bounds.height, width: 53.5, height: 57.5),
//                                          image: UIImage.init(named: "L1_sprint"),
//                                          finalLocation: ConstantsHelper.getSprintOriginalPoint(),
//                                          tooltipText: "Buenisimo! El Sprint es la iteracion en si. Esta puede durar de 2 a 4 semanas y es el tiempo en el que el equipo desarrolla las tareas que definio en el Sprint Backlog.",
//                                          delegate: self,
//                                          tag: 4)
//        self.containerView.addSubview(sprintDG)
//        self.dashedViews.append(createDashedView(for: sprintDG))
//
//
//        setToolTipViewGlobalReferences()
//        setTapGesture()
//    }
//    
//    override func viewWillAppear(_ animated: Bool) {
//        super.viewWillAppear(animated)
//    }
//
//
//
//    override var preferredStatusBarStyle : UIStatusBarStyle {
//        return UIStatusBarStyle.lightContent
//    }
//    
//    fileprivate func setTapGesture() {
//        let tap = UITapGestureRecognizer(target: self, action: #selector(containerViewTap))
//        self.view.addGestureRecognizer(tap)
//    }
//    
//    fileprivate func setToolTipViewGlobalReferences() {
//        var preferences = EasyTipView.Preferences()
//        preferences.drawing.font = UIFont(name: "Futura-Medium", size: 13)!
//        preferences.drawing.foregroundColor = UIColor.white
//        preferences.drawing.backgroundColor = UIColor(hue:0.46, saturation:0.99, brightness:0.6, alpha:1)
//        preferences.drawing.arrowPosition = EasyTipView.ArrowPosition.top
//        
//        EasyTipView.globalPreferences = preferences
//    }
//    
//
//    
//    fileprivate func createDashedView(for view: DraggableImageView) -> UIViewWithDashedLineBorder {
//        let targetView = UIViewWithDashedLineBorder(frame: CGRect(x: scrumFlowView.frame.minX, y: scrumFlowView.frame.minY - flowConstraintToTop.constant, width: 50, height: 50))
//        var p = view.finalLocation
//        p.y -= 100
//        targetView.tag = view.tag
//        targetView.center = p
//        scrumFlowView.addSubview(targetView)
//        return targetView
//    }
//    
//    
//    
//    func easyTipViewDidDismiss(_ tipView: EasyTipView) {
//
//        if let _ = self.presentedToolTip {
//            self.presentedToolTip = nil
//            checkIfAllSetted()
//        }
//    }
//
//
//    @objc func containerViewTap(){
//        self.dismissOldToolTipIfPresent()
//    }
//
//
//    func dismissOldToolTipIfPresent() {
//        presentedToolTip?.dismiss()
//    }
//    
//
//    func removeFinalPositionView(for tag: Int) {
//        
//        for view in dashedViews {
//            if view.tag == tag {
//                view.removeFromSuperview()
//                break
//            }
//        }
//    }
//
//    func setted(view: UIView) {
//        
//        if let dView = view as? DraggableImageView {
//            
//            removeFinalPositionView(for: dView.tag)
//            self.presentedToolTip = EasyTipView.init(text: dView.popTipText, delegate: self)
//            self.presentedToolTip?.show(forView: view)
//            viewsSetted += 1
//            
//            print("Views setted? \(viewsSetted)")
//        }
//    }
//    
//    
//    func checkIfAllSetted(){
//        
//        print("checking if views are 5")
//        
//        if viewsSetted == 5 {
//            
//            PopUpMessages.showCompletedTaskWithCompletion(with: "Nivel Completo!", description: "Has completado el nivel con exito! Felicitaciones 👏", buttonMessage: "Continuar", messageType: .taskCompleted, dismissAction: {
//                self.gameDelegate?.prepareForNextGame()
//            })
//            
//        }
//    }
//}
