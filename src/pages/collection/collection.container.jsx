import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors'
import  WithSpinner  from '../../components/with-spinner/with-spinner.component'
import CollectionPage from './collection.component';

const mapStatesToProps = createStructuredSelector({
    isLoading: (state)=> !selectIsCollectionsLoaded(state)
});


const CollectionPageContainer = compose(
    connect(mapStatesToProps),
    WithSpinner
)(CollectionPage)

export default CollectionPageContainer