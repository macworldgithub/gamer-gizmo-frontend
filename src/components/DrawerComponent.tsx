import React from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css';

const DrawerComponent = () => {
    const [isOpen, setIsOpen] = React.useState(false)

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    return (
        <>
            <button onClick={toggleDrawer} className='text-black mt-10'>Show</button>

            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                className='bla bla bla'
            >
                <div>Hello World</div>
                <div className='text-black'>Hello World</div>
                <div>Hello World</div>
                <div>Hello World</div>
                <div>Hello World</div>
                <div>Hello World</div>
                <div>Hello World</div>
            </Drawer>
        </>
    )
}

export default DrawerComponent