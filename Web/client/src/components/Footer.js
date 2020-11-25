import React, { Component,useState } from 'react';
import  '../assets/css/main.css';
import  '../assets/fonts/fontawesome-webfont.eot';
import {Link} from 'react-router-dom';
import './AdminStyles.css';
import { withTranslation } from 'react-i18next';
class Footer extends Component {


    render() {
        return (
            <>
			<footer id="footer" className="nav-amigote">
				<div class="inner">
					<h2>{this.props.t('Footer.title')}</h2>
					<ul class="actions">
						<li><span class="icon fa-phone"></span> <a href="#">0800-AMIGOTES</a></li>
						<li><span class="icon fa-envelope"></span> <a href="#">amigotestudai@gmail.com</a></li>
						<li><span class="icon fa-map-marker"></span>Bolivar, Argentina</li>
					</ul>
				</div>
				<div class="copyright">
					&copy;{this.props.t('Footer.copyright')}<a href="https://templated.co">Templated</a>. Images <a href="https://unsplash.com">Unsplash</a>.
				</div>
			</footer>
            </>
        );
    }
}
export default withTranslation()(Footer);
