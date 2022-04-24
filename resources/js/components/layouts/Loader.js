import React from 'react';

export default function Loader(props) {
    return (
        <>
            <div className="preloader flex-column justify-content-center align-items-center">
                {props.baseUrl ? (
                    <img className="animation__wobble" srcSet={props.baseUrl + 'dist/img/AdminLTELogo.png'}
                         alt="AdminLTELogo" height="60"
                         width="60"/>
                ) : null}
            </div>
        </>
    );
}

