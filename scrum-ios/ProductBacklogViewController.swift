//
//  ProductBacklogViewController.swift
//  scrum-ios
//
//  Created by Matias on 12/10/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import UIKit

class ProductBacklogViewController: UIViewController, UITableViewDelegate, UITableViewDataSource  {
    
    @IBOutlet weak var tableView: UITableView!
    
    let productBacklogItems = ["Chasis", "Frenos", "Motor", "Carroceria", "Transmisión", "Ruedas", "Volante"]
    
    weak var ppGameDelegate: PlanningPokerGameDelegate?

    override func viewDidLoad() {
        super.viewDidLoad()
        self.tableView.delegate = self
        self.tableView.dataSource = self
    }
    
    @IBAction func next(_ sender: Any) {
        ppGameDelegate?.move(to: .pivot)
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return productBacklogItems.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: ProductBacklogItemTableViewCell.identifier, for: indexPath) as! ProductBacklogItemTableViewCell
        cell.itemLabel.text = productBacklogItems[indexPath.row]
        return cell
    }
}

class ProductBacklogItemTableViewCell: UITableViewCell {
    
    @IBOutlet weak var itemLabel: UILabel!
//    @IBOutlet weak var backgroundImage: UIView!
    
    override func awakeFromNib() {
        self.layer.cornerRadius = 8
        self.layer.masksToBounds = true
    }
}

