basedir=$(pwd)/assets

# convert -scale 10% -colors 16 $basedir/bliss.png $basedir/newimage.png
# convert -scale 1000% $basedir/newimage.png $basedir/newimage.png

for file in $basedir/downsize/*;
do
  filename=$(echo "$file" | sed 's/downsize/pixelated/g')
  echo $filename
  convert -scale 10% -colors 16 $file $filename
done
