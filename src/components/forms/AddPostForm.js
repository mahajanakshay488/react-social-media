import { useState } from "react";
import { Box, Button, Input, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { postActions } from "../../store";

function AddPostForm(props) {

    const dispatch = useDispatch();
    const actions = bindActionCreators(postActions, dispatch);
    // const posts = useSelector(state => state.posts);

    const [imgUrl, setImgUrl] = useState('');

    const [credentials, setCredentials] = useState({
        imgfile: '',
        title: '',
        content: ''
    });

    const selectFile = (e) => {
        setCredentials({ ...credentials, imgfile: e.target.files[0] });
        var reader = new FileReader();
        var url = reader.readAsDataURL(e.target.files[0]);
        console.log('url', url);
        reader.onloadend = function (e) {
            setImgUrl(reader.result);
        }
    }


    const onSubmit = (event) => {
        event.preventDefault();
        props.setOpen(false);
        const formData = new FormData();
        formData.append('imgfile', credentials.imgfile);
        formData.append('title', credentials.title);
        formData.append('content', credentials.content);

        // console.log(formData.values);

        actions.addPost(formData)
            .then(res => {
                console.log('addPost res', res);
            })
            .catch(err => {
                console.log('addPost err', err);
        });
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <Box>

            <form onSubmit={onSubmit}>
                <Stack spacing={3}>
                    <label htmlFor="file">Select Image</label>
                    <Input
                        type="file"
                        onChange={selectFile}
                        required
                    />

                    <Box
                        height='100px'
                        width='100%'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <img
                            src={imgUrl}
                            alt="Media Preview"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                backgroundSize: 'custom',
                                backgroundPosition: 'center'
                            }}
                        />
                    </Box>
                    <TextField
                        name="title"
                        value={credentials.title}
                        onChange={handleChange}
                        id="standard-basic"
                        label="Blog Title"
                        variant="standard"
                        multiline
                        rows={2}
                        required
                    />
                    <TextField
                        name="content"
                        value={credentials.content}
                        onChange={handleChange}
                        id="standard-basic"
                        label="Blog Content"
                        variant="standard"
                        multiline
                        rows={6}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        color="primary"
                    >
                        Share Blog
                    </Button>
                </Stack>

            </form>
        </Box>
    );
}

export default AddPostForm;