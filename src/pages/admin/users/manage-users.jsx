'use client';

import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import {Link as RouterLink} from 'react-router-dom';
// import { paths } from '/src/paths';
import { dayjs } from '/src/lib/dayjs';
import { FilterButton } from '/src/components/core/filter-button';
import { StatusFilterPopover } from '/src/components/core/filters/StatusFilterPopover';
import { DataTable } from '/src/components/data-table/data-table';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import PageLoader from '/src/components/loaders/PageLoader';

import { deleteUserAsync, getUsers } from './_lib/user.actions';
import { defaultUser } from './_lib/user.types';
import { ManageUserDialog } from './manage-user-dialog';
import { RefreshPlugin } from '../../../components/core/plugins/RefreshPlugin';
import { useAuth } from '../../../context/authContext';
import { toast } from 'sonner';

export default function Users({ searchParams }) {
//   const { email, phone, sortDir } = searchParams;
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 10 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [status, setStatus] = React.useState('');

  const { auth} = useAuth();
  async function fetchList() {
    try {
      setLoading(true);
      const response = await getUsers({
        page: pagination.pageNo,
        rowsPerPage: pagination.limit,
        status: status,
      },
        auth?.tokens?.accessToken
    );
      if (response.success) {
        setUsers(response.data);
        setTotalRecords(response.totalRecords);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenModal = (data) => {
    setOpenModal(true);
    setModalData(data);
  };

  const handleConfirm = () => {
    setOpenModal(false);
    // fetchUsersData();
    fetchList();
  };

  const handleDelete = async (password) => {

    try {
      const idsToDelete = [];
      selectedRows.forEach((row) => {
        idsToDelete.push(row._id);
      });
      const response = await deleteUserAsync(idsToDelete, password, auth?.tokens?.accessToken);
      if (response.success) {
        toast.success(`${idsToDelete.length} user(s) deleted successfully`);
        fetchList();
      }
      else {
        toast.error(response.error?.message || 'Failed to delete users');
      }
      
    } catch (error) {
      toast.error(error.message);
      console.error('Error deleting users:', error);
      
    }
  
  };

  React.useEffect(() => {
    fetchList();
  }, [pagination, status]);

  const columns = [
    {
      formatter: (row) => (
        <Stack direction="row">
          <IconButton onClick={() => handleOpenModal(row)}>
            <PencilSimpleIcon />
          </IconButton>
        </Stack>
      ),
      name: 'Actions',
    //   hideName: true,
      align: 'right',
    },
    {
      formatter: (row) => (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <div>
            <Link
              color="inherit"
              component={RouterLink}
            //   href={paths.dashboard.customers.details('1')}
            href="#"
              sx={{ whiteSpace: 'nowrap' }}
              variant="subtitle2"
            >
              {row.fullName} 
            </Link>
            <Typography color="text.secondary" variant="body2">
              {row.email || "No email"}
            </Typography>
          </div>
        </Stack>
      ),
      name: 'Name',
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.contact_number}
        </Typography>
      ),
      name: 'Phone',
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.role}
        </Typography>
      ),
      name: 'Role',
    },
    {
      formatter(row) {
        return dayjs(row.createdAt).format('MMM D, YYYY h:mm A');
      },
      name: 'Created at',
    },
    {
      formatter: (row) => {
        return <Chip label={row.status} size="small" variant="outlined" />;
      },
      name: 'Status',
    },
  ];

 

  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
      }}
    >
      <Stack spacing={4}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Users</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            
            <Button startIcon={<PlusIcon />} variant="contained" 
            sx={{
                backgroundColor: 'green',
                opacity:'0.8'
            }}
            onClick={() => handleOpenModal(defaultUser)}>
              Add
            </Button>
          </Box>
        </Stack>
        <PageLoader loading={loading} error={null}>
          <Card>
            <Box sx={{ overflowX: 'auto' }}>
              <React.Fragment>
                <DataTable
                  isPagination={true}
                  totalRecords={totalRecords}
                  rowsPerPageOptions={pagination.limit}
                  pageNo={pagination.pageNo}
                  columns={columns}
                  rows={users}
                  uniqueRowId="id"
                  selectionMode="multiple"
                  leftItems={
                    <>
                      {/* <FilterButton
                        displayValue={status}
                        label="Status"
                        onFilterApply={(value) => {
                          setStatus(value);
                        }}
                        onFilterDelete={() => {
                          handlePhoneChange();
                        }}
                        popover={<StatusFilterPopover />}
                        value={status}
                      /> */}
                      <RefreshPlugin onClick={fetchList} />
                    </>
                  }
                  rightItems={
                    <>
                      <DeleteConfirmationPasswordPopover title={`Are you sure you want to delete ${selectedRows.length} record(s)?`}  onDelete={(password) => handleDelete(password)}  passwordInput disabled={selectedRows.length === 0} />
                    </>
                  }
                  onRowsPerPageChange={(pageNumber, rowsPerPage) =>
                    setPagination({ pageNo: pageNumber, limit: rowsPerPage })
                  }
                  onPageChange={(newPageNumber) => setPagination({ ...pagination, pageNo: newPageNumber })}
                  onSelection={(selectedRows) => setSelectedRows?.(selectedRows)}
                />
                {!users?.length ? (
                  <Box sx={{ p: 3 }}>
                    <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
                      No customers found
                    </Typography>
                  </Box>
                ) : null}
              </React.Fragment>
            </Box>
          </Card>
        </PageLoader>
      </Stack>
      {openModal && (
        <ManageUserDialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          onConfirm={handleConfirm}
          data={modalData}
        />
      )}
    </Box>
  );
}