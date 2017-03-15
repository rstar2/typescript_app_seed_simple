// import normal CSS styles
import './styles/styles.css';

// import LESS styles
import './styles/styles.less';

// import the real app
import { App } from './app/app';

// start the app when DOM is loaded
$(document).ready(() => {
  new App();
});


