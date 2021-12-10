import {
  Grid,
  Typography,
  Card,
  Paper,
  Avatar,
  CardHeader,
  CardMedia,
  CardContent,
} from "@mui/material";

const team = [
  {
    name: "Cristian Ricardo Garzón",
    avatar: "CG",
    email: "cristiangarzonortiz@gamil.com",
    role: "Product Owner",
    categorie: "nature",
    filter: "/sepia",
  },
  {
    name: "Yuly Alejandra Polania",
    avatar: "YP",
    email: "alejan_dra.2904@hotmail.com",
    role: "Scrum Master",
    categorie: "animals",
    filter: "",
  },
  {
    name: "Adrian Prieto",
    avatar: "AP",
    email: "adrianprietoc@gmail.com",
    role: "QA",
    categorie: "people",
    filter: "/sepia",
  },
  {
    name: "Alejandro Luis Romero",
    avatar: "AR",
    email: "aromero4@eafit.edu.co",
    role: "Arquitech",
    categorie: "arch",
    filter: "/gray",
  },
  {
    name: "Eduar Andrés Ruíz",
    avatar: "ER",
    email: "edwar_775@hotmail.com",
    role: "Desarrollador backend",
    categorie: "tech",
    filter: "/gray",
  },
];

const AboutUs = () => {
  return (
    <Card sx={{ width: "100%" }}>
      <Grid
        container
        sx={{ m: 3 }}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h5" gutterBottom component="div">
          Equipo de desarrollo
        </Typography>
      </Grid>
      <Grid
        container
        sx={{ p: "2%" }}
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        {team.map(({ name, avatar, email, role, categorie, filter }) => (
          <Grid item xs={12} sm={6} md={4} key={name}>
            <Paper elevation={3} sx={{ p: "2%" }}>
              <CardHeader
                avatar={<Avatar sx={{ bgcolor: "GREEN" }}>{avatar}</Avatar>}
                title={name}
              />
              <CardMedia
                component="img"
                height="100"
                image={`http://placeimg.com/200/200/${categorie}${filter}`}
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Rol: {role}
                  <br />
                  email: {email}
                </Typography>
              </CardContent>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default AboutUs;
