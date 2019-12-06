//
//  SubLevelCollectionViewCell.swift
//  scrum-ios
//
//  Created by Matias Glessi on 3/22/17.
//  Copyright © 2017 Matias Glessi. All rights reserved.
//

import UIKit
import MBCircularProgressBar

class SubLevelCollectionViewCell: UICollectionViewCell {

    @IBOutlet weak var sublevelTitleLabel: UILabel!
    @IBOutlet weak var sublevelStatusLabel: UILabel!

    @IBOutlet weak var backView: UIView!
    
    @IBOutlet weak var circularProgressView: MBCircularProgressBarView!
    
    var status: LevelStatus?
    
    override func awakeFromNib() {
        super.awakeFromNib()
        self.backView.layer.cornerRadius = 5
        self.backView.layer.masksToBounds = true

    }
    
    func setData(for sublevel: SubLevel, with progress: Progress?){
        self.sublevelTitleLabel.text = sublevel.name
        
        if let progress = progress {
            
            let progressStatus = sublevel.getStatus(for: progress, and: progress.sublevel_id)
            sublevel.status = progressStatus.status
            
            self.circularProgressView.value = CGFloat(progressStatus.progress)
            
            self.sublevelStatusLabel.text = progressStatus.status.asString()
            if progressStatus.status == .locked {
                self.backView.backgroundColor = .gray
                self.circularProgressView.backgroundColor = .gray
            }
            else {
                self.backView.backgroundColor = .white
                self.circularProgressView.backgroundColor = .white
            }   
        }
        else {
            self.circularProgressView.value = 0.0
            self.sublevelStatusLabel.text = "NO INICIADO"
        }
    }
}


