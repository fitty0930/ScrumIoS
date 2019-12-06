//
//  DraggableView.swift
//  scrum-ios
//
//  Created by Matias Glessi on 5/27/17.
//  Copyright © 2017 Matias Glessi. All rights reserved.
//

import UIKit
import EasyTipView

class DraggableImageView: UIImageView {
    
    
    weak var draggableContainerDelegate: DraggableViewDelegate?

    var lastLocation: CGPoint = CGPoint.init()
    
    let bool = false
    
    var popTipText = ""
    
    var originalLocation: CGPoint = CGPoint.init()
    var finalLocation: CGPoint = CGPoint.init()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        let panRecognizer = UIPanGestureRecognizer.init(target: self, action:#selector(self.detectPan(recognizer:)))
        self.gestureRecognizers = [panRecognizer]
        self.isUserInteractionEnabled = true
        self.originalLocation = frame.origin
        print(frame.origin)
    }
    
    init(frame: CGRect, image: UIImage?, finalLocation: CGPoint, tooltipText: String, delegate: DraggableViewDelegate ,tag: Int){
        super.init(frame: frame)
        let panRecognizer = UIPanGestureRecognizer.init(target: self, action:#selector(self.detectPan(recognizer:)))
        self.gestureRecognizers = [panRecognizer]
        self.isUserInteractionEnabled = true
        self.originalLocation = frame.origin
        self.finalLocation = finalLocation
        self.image = image
        self.popTipText = tooltipText
        self.draggableContainerDelegate = delegate
        self.tag = tag
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    func setFinalLocation(point: CGPoint){
        self.finalLocation = point
    }
    
    func setTooltip(with text: String){

        self.popTipText = text
        
    }
    
    @objc func detectPan(recognizer: UIPanGestureRecognizer){
        self.draggableContainerDelegate?.dismissOldToolTipIfPresent()
        let translation = recognizer.translation(in: self.superview)
        self.center = CGPoint.init(x: lastLocation.x + translation.x, y: lastLocation.y + translation.y)
        if recognizer.state == .ended {
            if (!self.isNearTarget(center: self.center)){
                self.frame.origin = self.originalLocation
            }
            else {
                self.draggableContainerDelegate?.setted(view: self)
                self.center = finalLocation
                self.isUserInteractionEnabled = false
                
            }
        }

    }
    
    func isNearTarget(center: CGPoint) -> Bool{
        
        if self.finalLocation.x - 20 ... self.finalLocation.x + 20 ~= center.x {
            if self.finalLocation.y - 20 ... self.finalLocation.y + 20 ~= center.y {
                return true
            }
        }
        return false
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        self.superview?.bringSubview(toFront: self)
        self.lastLocation = self.center
        lastLocation = self.center;
    }
}
