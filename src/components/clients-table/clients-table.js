import React, { useState, useEffect, useContext } from 'react';
import ClientApiService from '../../services/client-api-service'
import TaxHubContext from '../../context/taxhub-context'
import PropTypes from 'prop-types';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import './clients-table.css';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 300,
  },
});

export default function CustomPaginationActionsTable(props) {
  const context = useContext(TaxHubContext)
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [allClients, setAllClients] = useState([]);
  const [selected, setSelected] = useState([]);

  //responsible for handleing the click to select a row
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [id];
    }
    context.setCurrentClientSelected(id)
    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  useEffect(() => {
    ClientApiService.getAllClients()
      .then(res => {
        setAllClients(res)
      })
  }, []);
  
  function createData(id, clientName, entityType, yearEnd, status, link) {
    return { id, clientName, entityType, yearEnd, status, link };
  }
  
  const rows = allClients.map(client => {
    let link = ''
    let clientStatus = 'Active'
    if(!client.status) {
      clientStatus = 'Inactive'
    }
    return (
      createData(client.clientId, client.clientName, client.entityType, client.yearEnd.slice(5,10), clientStatus, link)
    )
  })
  

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#b1e5b9',
      color: 'black',
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const handleClickVisitIcon = (clientId) => {
    props.history.push(`/overview/${clientId}`)
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Client Name</StyledTableCell>
            <StyledTableCell align="right">Entity Type</StyledTableCell>
            <StyledTableCell align="right">Year End</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, index) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;
            
            return (
            <TableRow 
              key={row.id}
              hover
              onClick={(event) => handleClick(event, row.id)}
              aria-checked={isItemSelected}
              tabIndex={-1}
              selected={isItemSelected}
            >
              <TableCell style={{ width: 200 }} component="th" scope="row">
                {row.clientName}
              </TableCell>
              <TableCell style={{ width: 140 }} align="right">
                {row.entityType}
              </TableCell>
              <TableCell style={{ width: 140 }} align="right">
                {row.yearEnd}
              </TableCell>
              <TableCell style={{ width: 140 }} align="right">
                {row.status}
              </TableCell>
              <TableCell style={{ width: 50 }} align="center">
              </TableCell>
              <TableCell style={{ width: 30 }} align="center" className={'clientVisitCell'} onClick={() => handleClickVisitIcon(row.id)}>
                <FontAwesomeIcon icon={faEye} />
              </TableCell>
            </TableRow>
          )})}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={6}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
