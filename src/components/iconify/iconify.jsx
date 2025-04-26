'use client';

import { Icon, disableCache } from '@iconify/react';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import NoSsr from '@mui/material/NoSsr';


// ----------------------------------------------------------------------
export const iconifyClasses = {
    root: 'mnl__icon__root',
    flag: 'mnl__icon__flag',
  };

export const Iconify = forwardRef(function Iconify(
    { className, width = 20, sx, ...other },
    ref
) {
    const baseStyles = {
        width,
        height: width,
        flexShrink: 0,
        display: 'inline-flex',
    };

    const renderFallback = (
        <Box
            component="span"
            className={iconifyClasses.root.concat(className ? ` ${className}` : '')}
            sx={{ ...baseStyles, ...sx }}
        />
    );

    return (
        <NoSsr fallback={renderFallback}>
            <Box
                ssr
                ref={ref}
                component={Icon}
                className={iconifyClasses.root.concat(className ? ` ${className}` : '')}
                sx={{ ...baseStyles, ...sx }}
                {...other}
            />
        </NoSsr>
    );
});

// https://iconify.design/docs/iconify-icon/disable-cache.html
disableCache('local');