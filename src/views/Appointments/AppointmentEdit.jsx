import { Avatar, Button, Card, CardActions, CardContent, Chip, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { displayStatus } from 'utils/generalFunc';
import { checkFile } from 'utils/generalFunc';
// import basicConfig from 'utils/basicConfig';
// import * as Yup from "yup";

// const validateSchema = Yup.object({
//     userId: Yup.string(),
//     sellCompany: Yup.string(),
//     service: Yup.array(),
//     status: Yup.array(),
//     remark: Yup.string(),
//     totalAmount: Yup.number(),
//     isActive: Yup.bool(),
// })

const AppointmentEdit = () => {
    const shopInfo = useSelector(store => store.shop, shallowEqual);
    const appointment = useLocation().state.object;
    // const isEdit = useLocation().state.isEdit;
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <>
            <Card>
                <CardContent>
                    <Grid item container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Grid item container alignItems="center">
                                <Avatar src={checkFile(shopInfo.logo)} variant="rounded" sx={{ width: 52, height: 52 }} />

                                <Typography variant="h6" sx={{ ml: 1 }}>{shopInfo.name}</Typography>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid item container justifyContent="end" alignItems="center">
                                <Chip color={displayStatus(appointment.status[0].type).color} label={t(displayStatus(appointment.status[0].type).value)} />
                            </Grid>

                            <Grid item sx={{ mt: 1 }}>
                                <Typography variant="h6">Invoice number: {appointment.id}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item container xs={12} py={2}>
                        <Grid item xs={12} sm={6}>
                            <Grid item>
                                <Typography>{t("invoiceFrom")}</Typography>
                            </Grid>

                            <Grid item mt={2}>
                                <Typography>{shopInfo.name}</Typography>
                                <Typography>{`${appointment.sellCompany.address?.house}, ${appointment.sellCompany.address?.street}, ${appointment.sellCompany.address?.state}, ${appointment.sellCompany.address?.city}, ${appointment.sellCompany.address?.country}, ${appointment.sellCompany.address?.zipCode}`}</Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} textAlign="end">
                            <Grid item>
                                <Typography>{t("invoiceTo")}</Typography>
                            </Grid>

                            <Grid item mt={2}>
                                <Typography>{`${appointment.userId.firstName} ${appointment.userId.lastName}`}</Typography>
                                <Typography>{`${appointment.userId.address?.house}, ${appointment.userId.address?.street}, ${appointment.userId.address?.state}, ${appointment.userId.address?.city}, ${appointment.userId.address?.country}, ${appointment.userId.address?.zipCode}`}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item container xs={12} py={2}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell width="80">#</TableCell>
                                        <TableCell>{t("serviceName")}</TableCell>
                                        <TableCell align="right" width="150">{t("date")}</TableCell>
                                        <TableCell align="right" width="180">{t("unitPrice")}</TableCell>
                                        <TableCell align="right" width="180">{t("totalPrice")}</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {
                                        appointment.services.map((item, key) => (
                                            <TableRow key={key}>
                                                <TableCell width="80">{item.id}</TableCell>

                                                <TableCell>{item.service.name}</TableCell>

                                                <TableCell align="right" width="250">{moment(item.date).format("DD / MMMM / YYYY - hh:mm A")}</TableCell>

                                                <TableCell align="right" width="180">$ {item.service.price}</TableCell>

                                                <TableCell align="right" width="180">$ {item.service.price}</TableCell>
                                            </TableRow>
                                        ))
                                    }

                                    <TableRow>
                                        <TableCell colSpan={3}>&nbsp;</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                        <TableCell align="right">
                                            $ {
                                                appointment.services.reduce((pre, cur) => (
                                                    pre + cur.service.price
                                                ), 0)
                                            }
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </CardContent>

                <CardActions>
                    <Grid item container justifyContent="end" alignItems="center">
                        {/* <Button variant="contained" color="primary" sx={{ mr: 2 }}>Submit</Button> */}

                        <Button variant="outlined" color="error" onClick={() => navigate("/app/appointments")}>{t("goBack")}</Button>
                    </Grid>
                </CardActions>
            </Card>
        </>
    )
}

export default AppointmentEdit;
