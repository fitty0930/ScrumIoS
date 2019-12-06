//
//  GameScene.swift
//  scrum-ios
//
//  Created by Matias on 21/09/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import SpriteKit
import GameplayKit
import CoreMotion

class GameScene: SKScene, SKPhysicsContactDelegate {
    
    var starfield: SKEmitterNode!
    var player: SKSpriteNode!
    
    var scoreLabel: SKLabelNode!
    var timerLabel: SKLabelNode!
    
    let expectedResult: Int = 13

    weak var spaceGameDelegate: SpaceGameDelegate?

    var score: Int = 0 {
        didSet {
            scoreLabel.text = score > 9 ? "0\(score)" : "00\(score)"
        }
    }
    
    var gameTimer: Timer!
    var timer: Timer!
    var possibleAliens = ["alien", "alien2", "alien3", "alien4", "alien5", "alien6", "alien7"]
    
    let alienCategory: UInt32 = 0x1 << 1
    let photonTorpedoCategory: UInt32 = 0x1 << 1
    
    let motionManager = CMMotionManager()
    var xAcceleration: CGFloat = 0
    
    var timerValue: Int = 30
    
    var alienActionDuration: TimeInterval = 6
    
    override func didMove(to view: SKView) {
        
        starfield = SKEmitterNode.init(fileNamed: "Starfield")
        starfield.position = CGPoint(x: 0, y: UIScreen.main.bounds.height + 100)
        starfield.advanceSimulationTime(10)
        addChild(starfield)
        
        starfield.zPosition = -1
        player = SKSpriteNode(imageNamed: "shuttle")
        player.anchorPoint = CGPoint.init(x: 0.5, y: 0.5)
        player.position = CGPoint.init(x: 0, y: -UIScreen.main.bounds.height + 65)
        player.scale(to: CGSize.init(width: 200, height: 150))
        
        addChild(player)
        
        physicsWorld.gravity = CGVector.init(dx: 0, dy: 0)
        physicsWorld.contactDelegate = self
       
        scoreLabel = SKLabelNode.init(text: "000")

        scoreLabel.position = CGPoint.init(x: UIScreen.main.bounds.width - 30, y: UIScreen.main.bounds.height - 30)
        scoreLabel.fontSize = 50
        scoreLabel.fontColor = .white
        score = 0
        scoreLabel.fontName = "SquareFont"
        addChild(scoreLabel)
        
        timerLabel = SKLabelNode.init(text: "00:30")

        timerLabel.position = CGPoint.init(x: -UIScreen.main.bounds.width + 40, y: UIScreen.main.bounds.height - 30)
        timerLabel.fontSize = 50
        timerLabel.fontColor = .white
        timerLabel.fontName = "SquareFont"
        addChild(timerLabel)
        
        
        gameTimer = Timer.scheduledTimer(timeInterval: 0.75, target: self, selector: #selector(addAlien), userInfo: nil, repeats: true)
        timer = Timer.scheduledTimer(timeInterval: 1, target: self, selector: #selector(updateTimer), userInfo: nil, repeats: true)

        
        motionManager.accelerometerUpdateInterval = 0.1
        motionManager.startAccelerometerUpdates(to: OperationQueue.current!) { (data, error) in
            if let data = data {
                self.updatePositionWithAccelerometerData(data)
            }
        }
        
    }
    
    @objc func updateTimer() {
    
        if timerValue > 0 {
            timerValue -= 1
            timerLabel.text = calculateSeconds(timerValue)
        }
        else {
            timerLabel.text = calculateSeconds(timerValue)
            timer.invalidate()
            spaceGameDelegate?.showAlert(with: score)
        }
    
    }
    
    

    fileprivate func calculateSeconds(_ value: Int) -> String {
//        return String(format:"%02i", value)
        
        let minutes = value / 60 % 60
        let seconds = value % 60
        return String(format:"%02i:%02i", minutes, seconds)
    }
    
    fileprivate func updatePositionWithAccelerometerData(_ data: CMAccelerometerData) {
        self.xAcceleration += CGFloat(data.acceleration.x * 200)
        
        if self.player.position.x > UIScreen.main.bounds.width {
            self.xAcceleration = UIScreen.main.bounds.width - 20
        }
        else if self.player.position.x < -UIScreen.main.bounds.width {
            self.xAcceleration = -UIScreen.main.bounds.width + 20
            
        }
    }
    
    @objc func addAlien() {
      
        let alien = SKSpriteNode(imageNamed: possibleAliens.randomElement()!)
        alien.scale(to: CGSize.init(width: 80, height: 60))

        let randomAlienPosition = GKRandomDistribution.init(lowestValue: Int(-UIScreen.main.bounds.width), highestValue: Int(UIScreen.main.bounds.width))
        let position = CGFloat(randomAlienPosition.nextInt())
        alien.position = CGPoint.init(x: position, y: self.frame.size.height + (alien.size.height))
        alien.physicsBody = SKPhysicsBody.init(rectangleOf: (alien.size))
        alien.physicsBody?.isDynamic = true
        
        alien.physicsBody?.categoryBitMask = alienCategory
        alien.physicsBody?.contactTestBitMask = photonTorpedoCategory
        alien.physicsBody?.collisionBitMask = 0
        
        addChild(alien)
        
        let animationDuration: TimeInterval = 6
        var actionArray = [SKAction]()
        
        actionArray.append(SKAction.move(to: CGPoint.init(x: position, y: -(UIScreen.main.bounds.height) - 50), duration: animationDuration))
        actionArray.append(SKAction.removeFromParent())
        
        alien.run(SKAction.sequence(actionArray))
        
    }
    
    
    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        fireTorpedo()
    }
    
    
    func fireTorpedo(){
        self.run(SKAction.playSoundFileNamed("torpedo.mp3", waitForCompletion: false))
        
        let torpedoNode = SKSpriteNode(imageNamed: "torpedo")
        torpedoNode.position = player.position
        torpedoNode.position.y += 35
        torpedoNode.scale(to: CGSize.init(width: 20, height: 20))

        torpedoNode.physicsBody = SKPhysicsBody.init(circleOfRadius: torpedoNode.size.width / 2)
        torpedoNode.physicsBody?.isDynamic = true
        
        torpedoNode.physicsBody?.categoryBitMask = photonTorpedoCategory
        torpedoNode.physicsBody?.contactTestBitMask = alienCategory
        torpedoNode.physicsBody?.collisionBitMask = 0
        torpedoNode.physicsBody?.usesPreciseCollisionDetection = true
        
        addChild(torpedoNode)
        
        let animationDuration: TimeInterval = 0.3
        var actionArray = [SKAction]()
        
        actionArray.append(SKAction.move(to: CGPoint.init(x: player.position.x, y: UIScreen.main.bounds.height + 50), duration: animationDuration))
        actionArray.append(SKAction.removeFromParent())
        
        torpedoNode.run(SKAction.sequence(actionArray))
    }
    
    
    
    func didBegin(_ contact: SKPhysicsContact) {
        var firstBody: SKPhysicsBody
        var secondBody: SKPhysicsBody
        
        if contact.bodyA.categoryBitMask < contact.bodyB.categoryBitMask {
            firstBody = contact.bodyA
            secondBody = contact.bodyB
        }
        else {
            firstBody = contact.bodyB
            secondBody = contact.bodyA
        }
        
        if (firstBody.categoryBitMask & photonTorpedoCategory) != 0 && (secondBody.categoryBitMask & alienCategory) != 0 {
            torpedoDidCollideWithAlien(torpedoNode: firstBody.node as! SKSpriteNode, alienNode: secondBody.node as! SKSpriteNode)
        }
    }
    
    func torpedoDidCollideWithAlien(torpedoNode: SKSpriteNode, alienNode: SKSpriteNode) {
        let explosion = SKEmitterNode.init(fileNamed: "Explosion")!
        explosion.position = alienNode.position
        addChild(explosion)
        
        run(SKAction.playSoundFileNamed("explosion.mp3", waitForCompletion: false))
        
        torpedoNode.removeFromParent()
        alienNode.removeFromParent()
        
        run(SKAction.wait(forDuration: 2)) {
            explosion.removeFromParent()
        }
        
        score += 1
    }
    
   
    override func update(_ currentTime: TimeInterval) {
        player.run(SKAction.moveTo(x: xAcceleration, duration: 0.5))
    }
}

protocol SpaceGameDelegate: class {
    func showAlert(with result: Int)
}
