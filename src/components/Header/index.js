import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

import logo from '../../assets/logo.png';

export default function Header() {

    const [search, setSearch] = useState('')

    return (
        <div className="header">
            <header>
                <Link to="/">
                    <img src={logo} alt="Suculenta" />
                </Link>
                <div className="right-side">
                    <div className="search">
                        <form>
                            <input type="text" placeholder="Pesquisar suculenta..." value={search} onChange={event => setSearch(event.target.value)} />
                            <Link to={`/${search}`}>
                                <button type="submit"><i className="fas fa-search"></i></button>
                            </Link>
                        </form>
                    </div>
                    <div className="add">
                        <Link to="/suculenta/_add">
                            <button>Adicionar</button>
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    );
}