import numpy as np
from PIL import Image
from sklearn.cluster import KMeans

def extract_colors(image_path, num_colors=5):
    """
    Extract dominant colors from an image using k-means clustering
    
    Args:
        image_path (str): Path to the image file
        num_colors (int): Number of colors to extract
        
    Returns:
        list: List of RGB color tuples
    """

    image = Image.open(image_path)

    image = image.resize((150, 150))

    image = image.convert('RGB')

    pixels = np.array(image)

    pixels = pixels.reshape(-1, 3)

    kmeans = KMeans(n_clusters=num_colors, n_init=10)
    kmeans.fit(pixels)

    colors = kmeans.cluster_centers_

    counts = np.bincount(kmeans.labels_)
    colors = colors[np.argsort(counts)][::-1]
    
    return colors

print("Color extraction module created successfully!")