"use client"
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';

import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import Switch from '@mui/material/Switch';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import { useRouter } from 'next/navigation';
function Page() {
    const [showPassword, setShowPassword] = useState(false);

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
                    borderRadius: '21px', // Add border-radius to the track here
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
            borderRadius: '21px', // Add border-radius to the thumb here
        },
        '& .MuiSwitch-track': {
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            borderRadius: '21px', // Ensure border-radius is set for track here as well
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }));

   
    const [isUserFullyRegistered,setIsUserFullyRegistered] = useState(0)
    const useAuthRedirect = () => {
        const router = useRouter();

        useEffect(() => {
            const isSigned = localStorage.getItem('isSigned');
            // if (isSigned === 'false') {
            //     router.push('/auth/login');
            // }

            const userInfo = localStorage.getItem('user');
            console.log(userInfo)
            if(userInfo.status == 1){
                setIsUserFullyRegistered(1)
            }
            
        }, [router]);
    };
    useAuthRedirect()
    isUserFullyRegistered

    return <div className={`userCard--wrapper ${!isUserFullyRegistered ? "d-none" : ""}`}>

        <div className="userCard ">

            <div className="profile--header">
                <div className="profile--initals">
                    <span>გბ</span>
                </div>
                <h2>გიორგი ბერიძე</h2>
            </div>
            <div className="profile--inputs">
                <div className="profile--input">
                    <label className="form-label">სახელი</label>
                    <input type="text" className="form-control" value="გიორგი" />
                </div>
                <div className="profile--input">
                    <label className="form-label">ტელეფონის ნომერი</label>
                    <input type="text" className="form-control" value="557-567-999" />
                </div>
                <div className="profile--input">
                    <label className="form-label">გვარი</label>
                    <input type="text" className="form-control" value="ბერიძე" />
                </div>
                <div className="profile--input">
                    <label className="form-label">RS მომხმარებელი</label>
                    <input type="text" className="form-control" value="RS-0102556986" />
                </div>
                <div className="profile--input">
                    <label className="form-label">ელ-ფოსტა</label>
                    <input type="text" className="form-control" value="giorgi.beridze@gmailcom" />
                </div>
                <div className="profile--input">
                    <label className="form-label">პაროლი</label>
                    <FormControl variant="filled">

                        <FilledInput

                            id="filled-adornment-password"
                            value={`giorgi`}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
                <div className="profile--input">
                    <label className="form-label">შეტყობინებების მიღება</label>
                    <div className="d-block">
                        <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}

                        />
                    </div>
                </div>
                <div className="profile--input">
                    <label className="form-label">ბარათი</label>

                    <PaymentInputsWrapper {...wrapperProps} id="cardinput--wrapper">
                        <svg {...getCardImageProps({ images })} />
                        <input

                            value={`5483 8803 5431 2523`}

                        />
                    </PaymentInputsWrapper>
                    <div className="cardinput--delete">
                        <span>
                            ბარათის წაშლა
                        </span>
                        <img src="/assets/images/delete.svg" alt="" />
                    </div>
                </div>

            </div>

            <div className="profile--submitWrapper">
                <button className='usercard--submitBtn'>რედაქტირება</button>
            </div>





        </div>
    </div>
}

export default Page