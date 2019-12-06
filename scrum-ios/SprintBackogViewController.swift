//
//  SprintBackogViewController.swift
//  scrum-ios
//
//  Created by Matias on 13/10/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import UIKit

class SprintBackogViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {

    weak var ppGameDelegate: PlanningPokerGameDelegate?
    
//    let sprintBacklogItems = ["Chasis", "Frenos", "Motor", "Volante"]
    
    let sprintBacklogItems = [ProductBacklogItem(name: "Chasis", estimatedStoryPoints: 8, isPrority: true),
                              ProductBacklogItem(name: "Frenos", estimatedStoryPoints: 13, isPrority: true),
                              ProductBacklogItem(name: "Motor", estimatedStoryPoints: 5, isPrority: false),
                              ProductBacklogItem(name: "Volante", estimatedStoryPoints: 1, isPrority: false)]
    
    @IBOutlet weak var sprintBacklogTableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.sprintBacklogTableView.delegate = self
        self.sprintBacklogTableView.dataSource = self
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return sprintBacklogItems.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: SprintBacklogItemTableViewCell.identifier, for: indexPath) as! SprintBacklogItemTableViewCell
        cell.itemLabel.text = sprintBacklogItems[indexPath.row].name
        cell.storyPointsLabel.text = "Story Points: \(sprintBacklogItems[indexPath.row].estimatedStoryPoints)"
        
        if sprintBacklogItems[indexPath.row].isPrority {
            cell.itemView.backgroundColor = UIColor.yellow
            cell.tooltipView.isHidden = false
        }
        else {
            cell.itemView.backgroundColor = UIColor.lightGray
            cell.tooltipView.isHidden = true
        }
        
        cell.tooltipLabel.text = "Prioridad para el PO, por lo tanto debe estar en el sprint"
        
        return cell
    }

    
    @IBAction func next(_ sender: Any) {
        ppGameDelegate?.move(to: .nextGame)
    }
}


class SprintBacklogItemTableViewCell: UITableViewCell {
    
    @IBOutlet weak var storyPointsLabel: UILabel!
    @IBOutlet weak var itemView: UIView!
    @IBOutlet weak var itemLabel: UILabel!
    @IBOutlet weak var tooltipView: TooltipView!
    @IBOutlet weak var tooltipLabel: UILabel!
    
    override func awakeFromNib() {
        itemView.layer.cornerRadius = 8
        itemView.layer.masksToBounds = true
    }
}

struct ProductBacklogItem {
    
    var name: String
    var estimatedStoryPoints: Int
    var isPrority: Bool
}
