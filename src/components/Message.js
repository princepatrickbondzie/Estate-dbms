import React from 'react'

export default function Message({ variant, children }) {
    return (
        <div>
            {variant === 'warning' ? (
                <div className="flex flex-row px-4 gap-2 items-center border rounded-lg shadow overflow-hidden bg-white border-red-700">
                    <span className="flex-shrink-0 inline-flex mx-3 item-center justify-center leading-none rounded-full bg-red-700 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-8 w-8">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                        </svg>
                    </span>
                    <div className="flex-1">
                        <p className="text-sm text-red-700">{children}</p>
                    </div>
                    <button type="button" className="ml-6 p-2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            ) : (
                <>
                    {variant === 'success' ? (
                        <section className="">
                            <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
                                <div className="p-6 border-l-4 border-green-500 -6 rounded-r-xl bg-green-50">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-sm text-green-600">
                                                <p>{children}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ) : null}
                </>
            )}
        </div>
    )
}
