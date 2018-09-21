import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../build/styles/components/posters-list/style.css';
import PosterItem from '../poster-item';

class PostersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword: '',
        };
    }

    onKeywordChange = (e) => {
        const { value } = e.target;

        this.setState({
            keyword: value,
        });

        if (value.length > 2) {
            if (this.timeOut) {
                try {
                    clearInterval(this.timeOut);
                } catch (err) {
                    console.log(err);
                }
            }

            this.timeOut = setTimeout(() => {
                this.props.getPosters(this.state.keyword);
            }, 300)
        }
    }

    render() {
        const { keyword } = this.state;
        const { posters } = this.props;

        return (
            <div className='posters-view'>
                <span>Search: </span>
                <input className='search-input' type='text' value={keyword} onChange={this.onKeywordChange} />
                <div className='posters-list'>
                    {posters.map(p => <div className='poster-container'><PosterItem title={p.Title} url={p.Poster} /></div>)}
                </div>
            </div>
        );
    }
}

PostersList.propTypes = {
    posters: PropTypes.arrayOf(PropTypes.object).isRequired,
    getPosters: PropTypes.func.isRequired,
};

export default PostersList;