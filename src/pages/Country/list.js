import React, {PureComponent} from 'react';
import Table from '../../components/table';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {
    fetchCountriesRequested,
    sortCountry
} from '../../actions/country'

class App extends PureComponent {
    componentDidMount() {
        this.props.getCountries();
    }

    render() {
        const {countries, tableProps, onSort} = this.props;
        return (
            <div>
                <h3>Tabla de datos </h3>
                <Link to="/country/edit/new"> Nuevo </Link>
                <hr/>
                <Table {...{data: countries, ...tableProps, onSort: onSort}}/>
            </div>
        )
    }
}

const mapStateToProps = (state /* nuestro Store */, ownProps /*  */ ) => {
    const {documents: {countries, loading}, tableProps} = state.country;
    return {
        tableProps,
        countries,
        loading
    };
}

const mapDispatchToProps = (dispatch /* acciones a disparar */, ownProps /*  */ ) => ({
    getCountries: () => dispatch(fetchCountriesRequested()),
    onSort: sort => dispatch(sortCountry(sort))
})

export default connect(
    mapStateToProps, // MaspStateToProps 1
    mapDispatchToProps // MapDispatchToProps 2
    // MergeProps <<<<<  1 + 2 = 3
)(App);
