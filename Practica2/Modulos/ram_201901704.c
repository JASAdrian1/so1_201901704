#include <sys/sysinfo.h>
#include <linux/module.h>
#include <linux/kernel.h>



#include <linux/init.h>
#include <linux/proc_fs.h>
#include <asm/uaccess.h>
#include <linux/seq_file.h>



MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Modulo de ram, practica 2");
MODULE_AUTHOR("Jose Adrian Aguilar Sanchez");

struct sysinfo info_ram;
sysinfo(&info_ram);

static int escribir_archivo(struct seq_file *archivo, void *v){

    seq_printf(archivo,"Probando\n"); 
    seq_printf(archivo,"Probando otra cadena\n");
    seq_printf(archivo,"%lu",info_ram.freeram);
    return 0;
}

//Informacion que se muestra al mostrar archivo con cat
static int al_abrir(struct inode *inode, struct file *file){
    
    return single_open(file,escribir_archivo,NULL);
}

static struct proc_ops operaciones = {
    .proc_open = al_abrir,
    .proc_read = seq_read
};


static int _insert(void){
    proc_create("ram_201901704",0,NULL,&operaciones);
    printk(KERN_INFO "Se inserto el modulo RAM\n");
    return 0;
}

static void _remove(void){
    remove_proc_entry("ram_201901704", NULL);
    printk(KERN_INFO "Se removio el modulo RAM\n");

}



module_init(_insert);
module_exit(_remove);