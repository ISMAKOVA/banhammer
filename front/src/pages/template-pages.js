import * as React from "react";
import {Disclosure,} from '@headlessui/react'
import {Link} from "react-router-dom";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export class SystemPagesTemplate extends React.Component {

    constructor(props) {
        super(props);
        setTimeout(() => {
            this.updateCurrent();
        })
    }

    state = {
        navigation: [
            {name: 'Общая таблица', href: 'main'},
            {name: 'Добавить картинки', href: 'addPic'},
            {name: 'Разметить картинки', href: 'markup'},
        ],
        current: null,
    }

    isCurrent(href) {
        return href === this.state.current;
    }

    getCurrent = () => {
        return this.state.navigation.find(i => this.isCurrent(i.href))
    }

    updateCurrent = () => {
        if (window.location.pathname === '/')
            this.props.history.push('dashboard');
        setTimeout(() => {
            this.state.navigation.forEach((nav) => {
                if (window.location.pathname.slice(1).startsWith(nav.href)) {
                    this.setState({current: nav.href})
                }
            })
        })
    }

    render() {
        return (
                <div className="flex flex-col h-screen justify-between bg-neomorphic-blue ">
                    <Disclosure as="nav" className="">
                        {({open}) => (
                            <>
                                <div className="max-w-7xl mx-auto px-12 sm:px-4 lg:px-14">
                                    <div className="flex flex-row-reverse items-center space-x-4 pt-6 justify-between px-6">
                                       <Link to={'main'} onClick={this.updateCurrent} className="px-8 py-8 order-last bg-blue-700 rounded-full blur-sm"> </Link>
                                        <div>
                                        {this.state.navigation.map((item) => (
                                            <Link
                                                onClick={this.updateCurrent}
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    this.isCurrent(item.href)
                                                        ? 'text-gray-600/70'
                                                        : 'text-gray-600 hover:text-gray-600/70',
                                                    'px-3 py-2 text-base font-medium no-underline '
                                                )}
                                                aria-current={this.isCurrent(item.href) ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                        </div>
                                    </div>

                                </div>

                                <Disclosure.Panel className="md:hidden">
                                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                        {this.state.navigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-blue-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'block px-3 py-2 rounded-md text-base font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>

                    <header className="bg-neomorphic-blue px-12 pt-12">
                        <div className="max-w-7xl mx-auto px-8">
                            <h1 className="text-2xl font-bold text-gray-600">{this.getCurrent()?.name}</h1>
                        </div>
                    </header>
                    <main className='h-full bg-neomorphic-blue mb-auto'>
                        <div className="h-full max-w-7xl mx-auto py-4 sm:px-6 lg:px-8">
                            {this.props.children}
                        </div>
                    </main>
                    <footer className="bg-neomorphic-blue py-8 px-12 text-sm text-gray-600/70  flex justify-between">
                        <div className="px-8"> ТюмГУ 2022 г.</div>
                        <div className="flex flex-row-reverse">
                            <a href="https://vk.com/ismaakova" className="px-8 hover:text-blue-800/70">Исмакова </a>
                            <a href="https://vk.com/mdliberateanimals" className="hover:text-blue-800/70">Долгушин </a>
                        </div>
                    </footer>
                </div>
        )
    }
}
