//
//  PBIEstimationViewController.swift
//  scrum-ios
//
//  Created by Matias on 12/10/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import UIKit

class PBIEstimationViewController: UIViewController {

    let fibonacciSequence = ["0", "1/2", "1", "2", "3", "5", "8", "13", "20", "40", "100", "∞", "?"]

    @IBOutlet weak var collectionView: UICollectionView!
    
    weak var ppGameDelegate: PlanningPokerGameDelegate?

    override func viewDidLoad() {
        super.viewDidLoad()
        self.collectionView.delegate = self
        self.collectionView.dataSource = self
    }
}

extension PBIEstimationViewController: UICollectionViewDelegate, UICollectionViewDataSource {

    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        ppGameDelegate?.selected(card: fibonacciSequence[indexPath.row])
        
        PopUpMessages.showNotificationMessage(with: "Calculando...", desc:  "Simulando la decision de los demas integrantes", buttonMessage: "", messageType: .waiting, textColor: .black) {
            self.ppGameDelegate?.move(to: .cardsShown)
        }
        
    }

    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {

        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "PPCardCollectionCell", for: indexPath) as! PPCardCollectionCell
        cell.valueLabel.text = fibonacciSequence[indexPath.row]
        return cell
    }

    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return fibonacciSequence.count
    }
}

class PPCardCollectionCell: UICollectionViewCell {

    @IBOutlet weak var valueLabel: UILabel!
    @IBOutlet weak var backgroundImage: UIImageView!

    override func awakeFromNib() {
        self.layer.cornerRadius = 8
        self.layer.masksToBounds = true
    }

}


