import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Link from "next/link";

function BooksLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style = {{
                marginTop: 3
            }}
          >
            <IconButton href="/books/multiple" color="inherit" style = {{marginBottom: 2.5}}>
              <LocalLibraryIcon />
            </IconButton>
            JAVAN LIBRARY
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <IconButton href="/books/multiple" color="inherit">
              <ListIcon />
            </IconButton>
            <IconButton href="/books/add" color="inherit">
              <AddIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {children}
    </section>
  );
}

export default BooksLayout;