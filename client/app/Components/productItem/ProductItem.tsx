"use client";
import { Grid, Typography, Card, CardContent, Rating ,Box} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductItem({ product }: { product: any }) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 14 }}>
      <Link href={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
        <Card sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          transition: 'transform 0.2s', 
          '&:hover': { transform: 'scale(1.02)' } 
        }}>
          {/* We use a Box as a container to control the Image size */}
          <Box sx={{ position: 'relative', height: 250, width: '100%' }}>
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
            <Typography gutterBottom variant="h6" sx={{ fontSize: '1rem', height: '3rem', overflow: 'hidden' }}>
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
  );
}