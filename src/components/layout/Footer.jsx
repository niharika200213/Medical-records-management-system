import React from 'react';
import {
    MDBFooter,
    MDBIcon
} from 'mdb-react-ui-kit';

const Footer = () => {
    return (
        <MDBFooter className='bg-light text-center text-white'>
            <div className='container p-4 pb-0'>
                <section className='mb-4'>
                    <a
                        className='btn btn-primary btn-floating m-1'
                        style={{ backgroundColor: '#55acee' }}
                        href='https://twitter.com/thought_pool_'
                        role='button'
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <MDBIcon fab icon='twitter' />
                    </a>

                    <a
                        className='btn btn-primary btn-floating m-1'
                        style={{ backgroundColor: '#ac2bac' }}
                        href='https://www.instagram.com/thought_pool_'
                        role='button'
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <MDBIcon fab icon='instagram' />
                    </a>

                    <a
                        className='btn btn-primary btn-floating m-1'
                        style={{ backgroundColor: '#0082ca' }}
                        href='https://www.linkedin.com/in/niharika-rastogi'
                        role='button'
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <MDBIcon fab icon='linkedin-in' />
                    </a>

                    <a
                        className='btn btn-primary btn-floating m-1'
                        style={{ backgroundColor: '#333333' }}
                        href='https://github.com/niharika200213'
                        role='button'
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <MDBIcon fab icon='github' />
                    </a>
                </section>
            </div>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                © 2024 Copyright:
                <a className='text-white' href='https://mdbootstrap.com/'>
                    MedDocs
                </a>
            </div>
        </MDBFooter>
    );
};

export default Footer;