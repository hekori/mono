import React from 'react'
import {classNames} from '../ClassNames'
import {useHistory} from "react-router-dom";

export const InternalLink: React.FC<React.HTMLProps<HTMLAnchorElement>> = ({
                                                                               children,
                                                                               href,
                                                                               ...props
                                                                           }) => {

    const history = useHistory()

    return (
        <a
            onClick={() =>
                history.push(href)
            }
            {...props}
            className={classNames(
                'cursor-pointer text-onDocumentHighlight hover:underline focus:underline focus:outline-none',
                props.className
            )}
        >
            {children}
        </a>
    )
}
