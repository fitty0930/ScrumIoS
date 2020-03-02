//
//  BigLevelCollectionViewCell.swift
//  scrum-ios
//
//  Created by Matias Glessi on 3/22/17.
//  Copyright © 2017 Matias Glessi. All rights reserved.
//

import UIKit

class BigLevelCollectionViewCell: UICollectionViewCell {
    
    @IBOutlet weak var playNowLabel: UILabel!
    @IBOutlet weak var gradientView: MultipleColorsGradientView!
    @IBOutlet weak var backView: UIView!
    @IBOutlet weak var levelTitleLabel: UILabel!
    @IBOutlet weak var percentageLabel: UILabel!
    @IBOutlet weak var subLevelsNumberLabel: UILabel!
    @IBOutlet weak var lockedView: UIView!
    @IBOutlet weak var levelNumber: UILabel!
    @IBOutlet weak var statusImage: UIImageView!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        self.backView.layer.cornerRadius = 8
        self.backView.layer.masksToBounds = true
        self.gradientView.colors = [
            UIColor(red:0.64, green:0.41, blue:0.98, alpha:1.0),
            UIColor(red:0.51, green:0.50, blue:0.98, alpha:1.0),
            UIColor(red:0.20, green:0.70, blue:0.98, alpha:1.0),
            UIColor(red:0.00, green:0.83, blue:0.98, alpha:1.0)
        ]
    }
    
    func setLevelData(with level: Level, and progress: Progress?, currentAvailableLevel: Int){
        
        var percentage: Int?
        
        self.levelTitleLabel.text = level.title
        self.subLevelsNumberLabel.text = getSublevelsText(value: level.sublevels.count)
        self.levelNumber.text = "\(level.level_number)"
        
        if let progress = progress {
            self.percentageLabel.show()
            percentage = level.percentage(from: progress)
            if let per = percentage { self.percentageLabel.text = "\(per)%" }
        }
        else {
            self.percentageLabel.hide()
        }
        
        level.id ?? 1 <= currentAvailableLevel ? showUnLocked() : showLocked()
        if let per = percentage { checkCompletion(for: per) }
    }
    
    
    func getSublevelsText(value: Int) -> String {
        
        switch value {
        case 0:
            return ""
        case 1:
            return "\(value) subnivel"
        default:
            return "\(value) subniveles"
        }
    }
    

    
    func isLocked() -> Bool {
        return !self.lockedView.isHidden
    }
    
    
    func showLocked(){
        lockedView.show()
        statusImage.image = UIImage.init(named: "blocked")
        statusImage.isHidden = false
        playNowLabel.text = "No disponible"
    }
    
    func showUnLocked(){
        lockedView.hide()
        statusImage.isHidden = true
        playNowLabel.text = "Jugar ahora"
    }

    
    func checkCompletion(for value: Int) {
        if value == 100 {
            statusImage.image = UIImage.init(named: "completed")
            statusImage.isHidden = false
            playNowLabel.text = "Completo! 🤘"
        }
        else {
            statusImage.isHidden = true
            playNowLabel.text = "Jugar ahora"

        }
    }
    
}
