ARCH=x64
LIBRARIES= -lsfml-graphics -lsfml-window -lsfml-system 
LIBPATH = -LLibraries/$(ARCH)
CXX = g++
OBJPATH = bin/$(ARCH)
OBJS = $(OBJPATH)/main.o
GCCPATH = ../../../mingw64/bin/g++

main:
	$(GCCPATH) -c main.cpp -o $(OBJS) -Iincludes/$(ARCH)
	$(GCCPATH)  bin/$(ARCH)/main.o -o bin/$(ARCH)/main.exe $(LIBPATH) $(LIBRARIES)
	./bin/x64/main.exe
run:
	./bin/$(ARCH)/main.exe