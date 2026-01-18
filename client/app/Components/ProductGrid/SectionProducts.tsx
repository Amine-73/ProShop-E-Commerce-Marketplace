import { Container, Grid, Typography, Card, Box, CardContent, Rating } from '@mui/material';
import {useEffect,useState} from 'react'
import axios from 'axios'
import products from '../Products/Products.js'; 
import Link from 'next/link'
import Image from 'next/image';

export default function SectionProducts() {
  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const fetchProducts=async()=>{
      try {
// Change this line:
        const { data } = await axios.get('http://localhost:5000/api/products');        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching products:",error);
        setLoading(false);
      }
    }
    fetchProducts();
  },[])
  if(loading) return <Typography>Loading products ...</Typography> 

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: 'bold' }}>
        Latest Products
      </Typography>
      
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid  key={product._id}  size={{ xs:12, md: 4 , sm:6,lg:4}}>
            <Link href={`/product/${product._id}`} style={{textDecoration:'none'}}>
              <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.2s', // Smooth hover effect
              '&:hover': { transform: 'scale(1.02)' } 
            }}>
              <Box sx={{ position: 'relative', height: 250, width: '100%' }}>
                {/* Convert img to import Image from 'next/image'; for more performence website  */}
            <Image
                src={product.image}
                alt={product.name}
                fill 
                style={{ 
                objectFit: 'cover', // This stretches/crops the image to fill the whole box
                objectPosition: 'center' // Keeps the subject of the photo centered
                }} 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h3" sx={{ fontSize: '1rem', height: '3rem', overflow: 'hidden' }}>
                  {product.name}
                </Typography>
                <Rating value={product.rating} precision={0.5} readOnly size="small" />
                <Typography variant="h5" sx={{ mt: 1, fontWeight: 'bold', color: 'primary.main' }}>
                  ${product.price}
                </Typography>
              </CardContent>
            </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 