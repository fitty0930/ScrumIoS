//
//  BigLevelCollectionViewCell.swift
//  scrum-ios
//
//  Created by Matias Glessi on 3/22/17.
//  Copyright © 2017 Matias Glessi. All rights reserved.
//

import UIKit

class BigLevelCollectionViewCell: UICollectionViewCell {
    
    @IBOutlet weak var gradientView: MultipleColorsGradientView!
    @IBOutlet weak var backView: UIView!
    @IBOutlet weak var levelTitleLabel: UILabel!
    @IBOutlet weak var percentageLabel: UILabel!
    @IBOutlet weak var subLevelsNumberLabel: UILabel!
    @IBOutlet weak var lockedView: UIView!
    @IBOutlet weak var levelNumber: UILabel!
    
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
        
        self.levelTitleLabel.text = level.title
        self.subLevelsNumberLabel.text = getSublevelsText(value: level.sublevels.count)
        self.levelNumber.text = "\(level.level_number)"
        
        if let progress = progress {
            self.percentageLabel.show()
            self.percentageLabel.text = "\(level.percentage(from: progress))%"
        }
        else {
            self.percentageLabel.hide()
        }
        
        level.id ?? 1 <= currentAvailableLevel ? lockedView.hide() : lockedView.show()
        
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
}
