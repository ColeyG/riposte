basedir=$(pwd)/assets

for file in $basedir/downsize/*;
do
  filename=$(echo "$file" | sed 's/downsize/pixelated/g')
  echo $filename
  convert -scale 20% -colors 16 $file $filename
done
