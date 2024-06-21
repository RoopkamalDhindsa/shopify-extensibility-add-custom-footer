import {reactExtension} from '@shopify/ui-extensions-react/checkout';

import Extension from './Extension.jsx';

// [START custom-footer.ext-point]
export default reactExtension('purchase.thank-you.footer.render-after', () => (
  <Extension />
));
// [END custom-footer.ext-point]
