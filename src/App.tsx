import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteUser, GetTodo, imageApi, addNewUser, EditUser, DeleteUserImg, EditCheck, AddNewUserImg, InfoUser } from './reducer/api'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';


function App() {
  const { data, info } = useSelector((state) => state.todo)

  const [open, setOpen] = useState(false)

  const [openAddImg, setOpenAddImg] = useState(false)

  const [Idx, setIdx] = useState(null)

  const [search, setSearch] = useState('')

  const [openInfo, setOpenInfo] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetTodo())
  }, [])

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      id: null,
      isCompleted: true,
      images: []
    },
    onSubmit: (values) => {
      if (values.id) {
        dispatch(EditUser(values))
        setOpen(false)
      }
      else {
        const formdata = new FormData()
        formdata.append("name", values.name)
        formdata.append("description", values.description)
        formdata.append("images", values.images)
        dispatch(addNewUser(formdata))
        setOpen(false)
      }
      if (Idx) {
        const formdata = new FormData()
        formdata.append("images", values.images)
        dispatch(AddNewUserImg({ id: Idx, formdata }))
        setOpenAddImg(false)
      }
      formik.resetForm()
    }
  })

  const handleEdit = (e) => {
    formik.setFieldValue("name", e.name)
    formik.setFieldValue("description", e.description)
    formik.setFieldValue("id", e.id)
    formik.setFieldValue("isCompleted", e.isCompleted)
    setOpen(true)
  }


  return (
    <>
      <div className='my-2 flex gap-2'>
        <button className='bg-blue-600 px-4 py-2 rounded-2xl' onClick={() => setOpen(true)}>👥</button>
        <input className='border-2  rounded-sm p-1' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' type="search" />
      </div>
      {open && (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"ADD NEW USER"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={formik.handleSubmit} className='flex flex-col gap-1'>
              <input className='border rounded-sm p-1' name='name' value={formik.values.name} onChange={formik.handleChange} type="text" />
              <input className='border rounded-sm p-1' name='description' value={formik.values.description} onChange={formik.handleChange} type="text" />
              <input className='border rounded-sm p-1' name='images' onChange={(e) => formik.setFieldValue("images", e.target.files[0])} type="file" />
              <DialogActions>
                <Button onClick={() => setOpen(false)}>Close</Button>
                <Button type='submit' autoFocus>
                  save
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {openAddImg && (
        <Dialog
          open={openAddImg}
          onClose={() => setOpenAddImg(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"ADD NEW USER"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={formik.handleSubmit} className='flex flex-col gap-1'>
              <input className='border rounded-sm p-1' name='images' onChange={(e) => formik.setFieldValue("images", e.target.files[0])} type="file" />
              <DialogActions>
                <Button onClick={() => setOpenAddImg(false)}>Close</Button>
                <Button type='submit' autoFocus>
                  save
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {openInfo && info && (
        <Dialog open={openInfo} onClose={() => setOpenInfo(false)}>
          <DialogTitle>INFO USER</DialogTitle>
          <DialogContent className="flex flex-col gap-2">
            <div className="flex flex-col ">
              {info?.data?.images?.map((img) => (
                <img
                  key={img.id}
                  src={`${imageApi}/${img.imageName}`}
                  width={250}
                  height={300}
                />
              ))}
            </div>
            <p>Name: {info?.data?.name}</p>
            <p>Description: {info?.data?.description}</p>
            <p>Status: {info?.data?.isCompleted ? 'Active' : 'Inactive'}</p>


          </DialogContent>
        </Dialog>
      )}


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: 'blue' }}>
            <TableRow>
              <TableCell><input type="checkbox" /></TableCell>
              <TableCell sx={{ color: 'white', fontWeight: '700' }}>Image</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: '700' }}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: '700' }}>Description</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: '700' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: '700' }}>:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
              .map((e) => (
                <TableRow className='hover:bg-gray-200 transition-colors duration-400'
                  key={e.id}
                  sx={{ '&:last-child td, &:last-child th ': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <input checked={e.isCompleted} onChange={() => dispatch(EditCheck(e.id))} type="checkbox" />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <div className='flex gap-1'>
                      {e.images.map((img) => (
                        <img key={img.id} width={60} className='rounded-full h-[60px]' src={`${imageApi}/${img?.imageName}`} alt="" />
                      ))
                      }
                    </div>
                  </TableCell>
                  <TableCell component="th" >
                    {e.name}
                  </TableCell>
                  <TableCell >{e.description}</TableCell>
                  <TableCell >{e.isCompleted ? (<div><span>Active</span></div>) : (<div><span>Inactive</span></div>)}</TableCell>
                  <TableCell >
                    <div className='flex gap-1'>
                      <span className='text-[20px] hover:cursor-pointer' onClick={() => dispatch(DeleteUser(e.id) )}>🗑️</span>
                      <span className='text-[20px] hover:cursor-pointer' onClick={() => handleEdit(e)}>✏️</span>
                      <span className='text-[20px] hover:cursor-pointer' onClick={() => dispatch(DeleteUserImg(e.images[0].id))}>🗄️</span>
                      <span className='text-[20px] hover:cursor-pointer' onClick={() => {
                        setIdx(e.id)
                        setOpenAddImg(true)
                      }}>🗃️</span>
                      <span
                        className='text-[20px]  hover:cursor-pointer'
                        onClick={() => {
                          dispatch(InfoUser(e.id))
                          setOpenInfo(true)
                        }}>ℹ️</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default App