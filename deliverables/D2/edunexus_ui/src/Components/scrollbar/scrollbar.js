import PropTypes from 'prop-types';
import { memo, forwardRef } from 'react';

import SimpleBar from 'simplebar-react';

import { alpha, styled } from '@mui/material/styles';

const StyledRootScrollbar = styled('div')(() => ({
    flexGrow: 1,
    height: '100%',
    overflow: 'hidden',
}));

const StyledScrollbar = styled(SimpleBar)(({ theme }) => ({
    maxHeight: '100%',
    '& .simplebar-scrollbar': {
        '&:before': {
            backgroundColor: alpha(theme.palette.grey[600], 0.48),
        },
        '&.simplebar-visible:before': {
            opacity: 1,
        },
    },
    '& .simplebar-mask': {
        zIndex: 'inherit',
    },
}));

const Scrollbar = forwardRef(({ children, sx, ...other }, ref) => {
    return (
        <StyledRootScrollbar>
            <StyledScrollbar
                scrollableNodeProps={{
                    ref,
                }}
                clickOnTrack={false}
                sx={sx}
                {...other}
            >
                {children}
            </StyledScrollbar>
        </StyledRootScrollbar>
    );
});

Scrollbar.propTypes = {
    children: PropTypes.node,
    sx: PropTypes.object,
};

export default memo(Scrollbar);