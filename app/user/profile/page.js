"use client"
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import Switch from '@mui/material/Switch';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import User from '@/components/user/User';
import useAuthRedirect from '@/components/atoms/UseAuthRedirect'; // Import your custom hook

function Page() {
    const [showPassword, setShowPassword] = useState(false);
    const { isUserFullyRegistered, user } = useAuthRedirect(); // Use the custom hook

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const {
        wrapperProps,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps
    } = usePaymentInputs();

    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible"  {...props} />
    ))(({ theme }) => ({
        width: 136,
        height: 42,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            color: '#9C9C9C',
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(72px)',
                color: '#9C9C9C',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                    opacity: 1,
                    border: 0,
                    borderRadius: '21px',
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 59,
            height: 38,
            borderRadius: '21px',
        },
        '& .MuiSwitch-track': {
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            borderRadius: '21px',
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }));

    return (
        <>
            {isUserFullyRegistered ? (
                <div className="profile">
                    <div className={`profile--wrapper userCard--wrapper`}>
                        <div className="userCard ">
                            <div className="profile--header">
                                <div className="profile--initals">
                                    <span>{`${user?.first_name?.[0] || ''}${user?.last_name?.[0] || ''}`}</span>
                                </div>
                                <h2>{`${user?.first_name || ''} ${user?.last_name || ''}`}</h2>
                            </div>
                            <div className="profile--inputs">
                                <div className="profile--input">
                                    <label className="form-label">სახელი</label>
                                    <input type="text" className="form-control" value={user?.first_name || ''} />
                                </div>
                                <div className="profile--input">
                                    <label className="form-label">ტელეფონის ნომერი</label>
                                    <input type="text" className="form-control" value={user?.phone_number || ''} />
                                </div>
                                <div className="profile--input">
                                    <label className="form-label">გვარი</label>
                                    <input type="text" className="form-control" value={user?.last_name || ''} />
                                </div>
                                <div className="profile--input">
                                    <label className="form-label">RS მომხმარებელი</label>
                                    <input type="text" className="form-control" value={user?.rs_username || ''} />
                                </div>
                                <div className="profile--input">
                                    <label className="form-label">ელ-ფოსტა</label>
                                    <input type="text" className="form-control" value={user?.email || ''} />
                                </div>
                                {/* Optional Additional Inputs */}
                            </div>
                            <div className="profile--submitWrapper">
                                <button className='usercard--submitBtn'>რედაქტირება</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <User />
            )}
        </>
    );
}

export default Page;
